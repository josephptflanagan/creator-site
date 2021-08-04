const { AuthenticationError } = require('apollo-server-express')
const { Video, Genre, Game, Tag, User } = require('../models')
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

        games: async () => {
            return await Game.find()
        },

        tags: async () => {
            return await Tag.find()
        },

        // optional parameters for search, otherwise return all
        videos: async (parent, { genres, games, tags, videoTitles }) => {
            const params = {}

            if (genres) {
                params.genres = genres
            }

            if (games) {
                params.games = games
            }

            if (tags) {
                params.tags = tags
            }

            if (videoTitles) {
                params.videoTitles = videoTitles
            }

            return await Video.find(params).populate('genres').populate('games').populate('tags').populate('videoTitles')
        }
    },
    Mutation: {
        addUser: async (parent, args) => {
            const { email } = args
            const userExists = await User.findOne({ email })
            if (userExists) {
                throw new AuthenticationError('User already exists')
            }

            const user = await User.create(args)
            const token = signToken(user)
            const userDirKey = args.username + '/'
            awsSignup(userDirKey)
            return { token, user }
        },

        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email })

            if (!user) {
                throw new AuthenticationError('Can not find user')
            }

            const correctPw = await user.isCorrectPassword(password)

            if (!correctPw) {
                throw new AuthenticationError('Sorry, incorrect credentials')
            }

            const token = signToken(user)

            return { token, user }
        },

        updateUserEmail: async (parent, { email }, context) => {
            if (context.user) {
                return await User.findByIdAndUpdate(
                    context.user._id,
                    { email },
                    { new: true }
                )
            }

            throw new AuthenticationError('Not logged in')
        },

        updateUserUsername: async (parent, { username }, context) => {
            if (context.user) {
                return await User.findByIdAndUpdate(
                    context.user._id,
                    { username },
                    { new: true }
                )
            }

            throw new AuthenticationError('Not logged in')
        },

        updateUserBio: async (parent, { bio }, context) => {
            if (context.user) {
                return await User.findByIdAndUpdate(
                    context.user._id,
                    { bio },
                    { new: true }
                )
            }

            throw new AuthenticationError('Not logged in')
        },

        updateUserLocation: async (parent, { location }, context) => {
            if (context.user) {
                return await User.findByIdAndUpdate(
                    context.user._id,
                    { location },
                    { new: true }
                )
            }

            throw new AuthenticationError('Not logged in')
        },

        updateUserSubscription: async (parent, { subscription }, context) => {
            if (context.user) {
                return await User.findByIdAndUpdate(
                    context.user._id,
                    { subscription },
                    { new: true }
                )
            }

            throw new AuthenticationError('Not logged in')
        },

        updateUserAuthority: async (parent, { authority }, context) => {
            if (context.user) {
                return await User.findByIdAndUpdate(
                    context.user._id,
                    { authority },
                    { new: true }
                )
            }

            throw new AuthenticationError('Not logged in')
        },

        updateVideoTitle: async (parent, { videoTitle }, context) => {
            if (context.video) {
                return await User.findByIdAndUpdate(
                    context.video._id,
                    { videoTitle },
                    { new: true }
                )
            }

            throw new AuthenticationError('Not logged in')
        },

        updateVideoDescription: async (parent, { description }, context) => {
            if (context.video) {
                return await User.findByIdAndUpdate(
                    context.video._id,
                    { description },
                    { new: true }
                )
            }

            throw new AuthenticationError('Not logged in')
        },

        updateVideoRecorded: async (parent, { recorded }, context) => {
            if (context.video) {
                return await User.findByIdAndUpdate(
                    context.video._id,
                    { recorded },
                    { new: true }
                )
            }

            throw new AuthenticationError('Not logged in')
        },

        updateVideoGenres: async (parent, { genres }, context) => {
            if (context.video) {
                return await User.findByIdAndUpdate(
                    context.video._id,
                    { genres },
                    { new: true }
                )
            }

            throw new AuthenticationError('Not logged in')
        },

        updateVideoGame: async (parent, { game }, context) => {
            if (context.video) {
                return await User.findByIdAndUpdate(
                    context.video._id,
                    { game },
                    { new: true }
                )
            }

            throw new AuthenticationError('Not logged in')
        },

        updateVideoTags: async (parent, { tags }, context) => {
            if (context.video) {
                return await User.findByIdAndUpdate(
                    context.video._id,
                    { tags },
                    { new: true }
                )
            }

            throw new AuthenticationError('Not logged in')
        },

        uploadVideo: async (parent, args, context) => {
            if (context.video) {
                // configure file and send to s3 here.  get url location in response and add to db
                // hardcode test
                // const args = { videoTitle: 'Video Test', videoUrl: 'http://test.com' };

                // s3 stuff
                const file = await args.file
                const { createReadStream, filename, mimetype } = file
                const fileStream = createReadStream()

                const username = context.user.username
                const UserVideoKey = encodeURIComponent(username) + '/'
                const videoKey = UserVideoKey + filename

                const uploadParams = {
                    Bucket: bucketName,
                    // Key: filename,
                    Key: videoKey,
                    Body: fileStream
                }
                const result = await s3.upload(uploadParams).promise()
                // console.log('s3 result: ', result);

                const cloudfrontUrlPrefix = 'http://d28dtfvuvlqgls.cloudfront.net/'
                const newVideoUrl = `${cloudfrontUrlPrefix}${result.Key}`

                const videoTitle = result.Key
                const videoUrl = newVideoUrl
                const videoArgs = { videoTitle, videoUrl }

                // instantiate new Video from s3 response data
                const video = new Video(videoArgs)
                console.log('video: ', video)

                const createVideoResponse = await User.findByIdAndUpdate(
                    context.user._id,
                    { $push: { videos: video } },
                    { new: true }
                )
                    .populate('genres')
                    .populate('tags')
                    .populate('games')
                    .populate('videos')

                console.log('createVideoResponse: ', createVideoResponse)
                return createVideoResponse
            }

            throw new AuthenticationError('Not logged in uploadVideo')
        },

        uploadProfilePic: async (parent, args, context) => {
            if (context.user) {
                // s3 stuff
                const file = await args.file
                const { createReadStream, filename, mimetype } = file
                const fileStream = createReadStream()

                const username = context.user.username
                const UserProfilePicKey = encodeURIComponent(username) + '/'
                const profilePicKey = UserProfilePicKey + filename

                const uploadParams = {
                    Bucket: bucketName,
                    Key: profilePicKey,
                    Body: fileStream
                }
                const result = await s3.upload(uploadParams).promise()

                const cloudfrontUrlPrefix = 'http://d28dtfvuvlqgls.cloudfront.net/'
                const newProfilePicUrl = `${cloudfrontUrlPrefix}${result.Key}`

                const createProfilePicResponse = await User.findByIdAndUpdate(
                    context.user._id,
                    { profilePicUrl: newProfilePicUrl },
                    { new: true }
                )
                    .populate('users')

                return createProfilePicResponse
            }

            throw new AuthenticationError('Not logged in')
        },

        uploadVideoThumbnail: async (parent, args, context) => {
            if (context.video) {
                // s3 stuff
                const file = await args.file
                const { createReadStream, filename, mimetype } = file
                const fileStream = createReadStream()

                const videoTitle = context.video.videoTitle
                const UserVideoThumbnailKey = encodeURIComponent(videoTitle) + '/'
                const videoThumbnailKey = UserVideoThumbnailKey + filename

                const uploadParams = {
                    Bucket: bucketName,
                    Key: videoThumbnailKey,
                    Body: fileStream
                }
                const result = await s3.upload(uploadParams).promise()

                const cloudfrontUrlPrefix = 'http://d28dtfvuvlqgls.cloudfront.net/'
                const newVideoThumbnailUrl = `${cloudfrontUrlPrefix}${result.Key}`

                const createVideoThumbnailResponse = await User.findByIdAndUpdate(
                    context.user._id,
                    { videoThumbnailUrl: newVideoThumbnailUrl },
                    { new: true }
                )
                    .populate('videos')

                return createVideoThumbnailResponse
            }

            throw new AuthenticationError('Not logged in')
        },

        uploadGameImg: async (parent, args, context) => {
            if (context.game) {
                // s3 stuff
                const file = await args.file
                const { createReadStream, filename, mimetype } = file
                const fileStream = createReadStream()

                const name = context.game.name
                const UserGameImgKey = encodeURIComponent(name) + '/'
                const gameImgKey = UserGameImgKey + filename

                const uploadParams = {
                    Bucket: bucketName,
                    Key: gameImgKey,
                    Body: fileStream
                }
                const result = await s3.upload(uploadParams).promise()

                const cloudfrontUrlPrefix = 'http://d28dtfvuvlqgls.cloudfront.net/'
                const newGameImgUrl = `${cloudfrontUrlPrefix}${result.Key}`

                const createGameImgResponse = await User.findByIdAndUpdate(
                    context.user._id,
                    { gameImgUrl: newGameImgUrl },
                    { new: true }
                )
                    .populate('games')

                return createGameImgResponse
            }

            throw new AuthenticationError('Not logged in')
        }
    }
}

module.exports = resolvers