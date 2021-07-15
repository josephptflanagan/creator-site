const { AuthenticationError } = require('apollo-server-express')
const { Video, Genre, Title,  } = require('../models')
const { signToken } = require('../utils/auth')
// const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');
const { awsSignup } = require('../utils/AWS')
const s3 = require('../utils/AWS').returnS3Instance()

const bucketName = process.env.BUCKET_NAME

const resolvers = {
    Query: {
        genres: async () => {
            return await Genre.find()
        },

        // optional parameters for search, otherwise return all
        videos: async (parent, { genres, titles }) => {
            const params = {}

            if (genres) {
                params.vibes = vibes
            }

            if (titles) {
                params.username = {
                    $regex: username
                }
            }

            return await Creator.find(params).populate('vibes').populate('songs')
        }
    },
    Mutation: {
        addCreator: async (parent, args) => {
            const { email } = args
            const userExists = await Creator.findOne({ email })
            if (userExists) {
                throw new AuthenticationError('User already exists')
            }

            const creator = await Creator.create(args)
            const token = signToken(creator)
            const creatrDirKey = args.username + '/'
            awsSignup(creatrDirKey)
            return { token, creator }
        },

        login: async (parent, { email, password }) => {
            const creator = await Creator.findOne({ email })

            if (!creator) {
                throw new AuthenticationError('Can not find creator')
            }

            const correctPw = await creator.isCorrectPassword(password)

            if (!correctPw) {
                throw new AuthenticationError('Sorry, incorrect credentials')
            }

            const token = signToken(creator)

            return { token, creator }
        },

        updateCreatorBio: async (parent, { bio }, context) => {
            if (context.creator) {
                return await Creator.findByIdAndUpdate(
                    context.creator._id,
                    { bio },
                    { new: true }
                )
                    .populate('vibes')
                    .populate('songs')
            }

            throw new AuthenticationError('Not logged in')
        },

        updateCreatorStageName: async (parent, { stageName }, context) => {
            if (context.creator) {
                return await Creator.findByIdAndUpdate(
                    context.creator._id,
                    { stageName },
                    { new: true }
                )
                    .populate('vibes')
                    .populate('songs')
            }

            throw new AuthenticationError('Not logged in')
        },

        updateCreatorLocation: async (parent, { location }, context) => {
            if (context.creator) {
                return await Creator.findByIdAndUpdate(
                    context.creator._id,
                    { location },
                    { new: true }
                )
                    .populate('vibes')
                    .populate('songs')
            }

            throw new AuthenticationError('Not logged in')
        },

        updateCreatorVibes: async (parent, { vibes }, context) => {
            if (context.creator) {
                return await Creator.findByIdAndUpdate(
                    context.creator._id,
                    { vibes },
                    { new: true }
                )
                    .populate('vibes')
                    .populate('songs')
            }

            throw new AuthenticationError('Not logged in CreatorTune')
        },

        uploadTune: async (parent, args, context) => {
            if (context.creator) {
                // configure file and send to s3 here.  get url location in response and add to db
                // hardcode test
                // const args = { title: 'Song Test', songUrl: 'http://test.com' };

                // s3 stuff
                const file = await args.file
                const { createReadStream, filename, mimetype } = file
                const fileStream = createReadStream()

                const username = context.creator.username
                const CreatrTuneKey = encodeURIComponent(username) + '/'
                const tuneKey = CreatrTuneKey + filename

                const uploadParams = {
                    Bucket: bucketName,
                    // Key: filename,
                    Key: tuneKey,
                    Body: fileStream
                }
                const result = await s3.upload(uploadParams).promise()
                // console.log('s3 result: ', result);

                const cloudfrontUrlPrefix = 'http://d28dtfvuvlqgls.cloudfront.net/'
                const newTuneUrl = `${cloudfrontUrlPrefix}${result.Key}`

                const title = result.Key
                const songUrl = newTuneUrl
                const tuneArgs = { title, songUrl }

                // instantiate new Song from s3 response data
                const song = new Song(tuneArgs)
                console.log('song: ', song)

                const createTuneResponse = await Creator.findByIdAndUpdate(
                    context.creator._id,
                    { $push: { songs: song } },
                    { new: true }
                )
                    .populate('vibes')
                    .populate('songs')

                console.log('createTuneResponse: ', createTuneResponse)
                return createTuneResponse
            }

            throw new AuthenticationError('Not logged in uploadTune')
        },

        uploadPhoto: async (parent, args, context) => {
            if (context.creator) {
                // s3 stuff
                const file = await args.file
                const { createReadStream, filename, mimetype } = file
                const fileStream = createReadStream()

                const username = context.creator.username
                const CreatrPhotoKey = encodeURIComponent(username) + '/'
                const photoKey = CreatrPhotoKey + filename

                const uploadParams = {
                    Bucket: bucketName,
                    Key: photoKey,
                    Body: fileStream
                }
                const result = await s3.upload(uploadParams).promise()

                const cloudfrontUrlPrefix = 'http://d28dtfvuvlqgls.cloudfront.net/'
                const newPhotoUrl = `${cloudfrontUrlPrefix}${result.Key}`

                const createPhotoResponse = await Creator.findByIdAndUpdate(
                    context.creator._id,
                    { imgUrl: newPhotoUrl },
                    { new: true }
                )
                    .populate('vibes')
                    .populate('songs')

                return createPhotoResponse
            }

            throw new AuthenticationError('Not logged in uploadPhoto')
        }
    }
}

module.exports = resolvers