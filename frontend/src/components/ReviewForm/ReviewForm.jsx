import './ReviewForm.css';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getReview, fetchReview, createReview, updateReview, deleteReview, removeReview } from '../../store/review';

export const ReviewForm = ({id="", className="ReviewForm", review, setReview}) => {
  const { locationId } = useParams();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const dispatch = useDispatch();

  // const handleSubmit = async e => {
  //   e.preventDefault();
  //   if (postId) {
  //     const data = {
  //       id: postId,
  //       title,
  //       body
  //     }
  //     dispatch(updatePost(data));
  //   } else {
  //     const data = {
  //       title,
  //       body
  //     }
  //     dispatch(createPost(data));
  //   }
  // }

  // useEffect(() => {
  //   if (postId) {
  //     setIsEdit(true);
  //     const post = useSelector(getPost(postId));
  //     setTitle(post.title);
  //     setBody(post.body);
  //     dispatch(fetchPost(postId));
  //   }
  // }, [dispatch, postId]);
  
  return (
    <>
      {/* <h1>{isEdit ? "Update Post" : "Create Post"}</h1>
      <form onSubmit={handleSubmit}>
        <label>Title
          <input type="text" value={title} onChange={e => setTitle(e.target.value)} />
        </label>
        <label>Body
          <textarea value={body} onChange={e => setBody(e.target.value)} />
        </label>
        <input type="submit" value={isEdit ? "Update Post" : "Create Post"} />
      </form> */}
    </>
  );

}

export default ReviewForm;