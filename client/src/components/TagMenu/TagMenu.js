import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useQuery } from '@apollo/react-hooks'
import { QUERY_VIDEO_TAGS } from '../../utils/queries'
import { hydrateTags } from '../../utils/actions'
import { idbPromise } from '../../utils/helpers'

import TagBtn from '../TagBtn/TagBtn'

import './TagMenu.css'

const TagMenu = () => {
	// get data from DB with Apollo
	const { loading, data: tagData } = useQuery(QUERY_VIDEO_TAGS)

	const { tags } = useSelector((state) => state)
	const dispatch = useDispatch()

	useEffect(
		() => {
			// if tagData exists or has changed from the response of useQuery, then run dispatch()
			if (tagData) {
				// execute our dispatch function with our action object indicating the type of action and the data to set our state for tags to
				dispatch(hydrateTags(tagData.tags))
				// also write to IndexedDB
				tagData.tags.forEach((tag) => {
					idbPromise('tags', 'put', tag)
				})
				// if app can't communicate with server, get tags from indexedDB
			} else if (!loading) {
				idbPromise('tags', 'get').then((tags) => {
					dispatch(hydrateTags(tags))
				})
			}
		},
		[ tagData, loading, dispatch ]
	)

	return (
		<>
			{loading ? null : (
				<div className='TagMenu m-2'>
					<h5 className='text-center'>Sort by tag</h5>
					{tags.map((tag) => <TagBtn key={tag._id} tag={tag} />)}
				</div>
			)}
		</>
	)
}

export default TagMenu