import React, { useState, useEffect } from 'react';
import { fetchComments, addComment, updateComment, deleteComment } from '../services/api';
import CommentForm from './CommentForm';

function CommentList({ movieId }) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingComment, setEditingComment] = useState(null);

  useEffect(() => {
    loadComments();
  }, [movieId]);

  const loadComments = async () => {
    try {
      setLoading(true);
      const data = await fetchComments(movieId);
      setComments(data);
      setLoading(false);
    } catch (err) {
      setError('Failed to load comments');
      setLoading(false);
      console.error(err);
    }
  };

  const handleAddComment = async (commentData) => {
    try {
      await addComment(movieId, commentData);
      // Reload comments to include the new one
      loadComments();
    } catch (err) {
      setError('Failed to add comment');
      console.error(err);
    }
  };

  const handleUpdateComment = async (commentData) => {
    try {
      await updateComment(editingComment._id, commentData);
      setEditingComment(null);
      // Reload comments to include the updated one
      loadComments();
    } catch (err) {
      setError('Failed to update comment');
      console.error(err);
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (window.confirm('Are you sure you want to delete this comment?')) {
      try {
        await deleteComment(commentId);
        // Remove the comment from the list
        setComments(comments.filter(comment => comment._id !== commentId));
      } catch (err) {
        setError('Failed to delete comment');
        console.error(err);
      }
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  if (loading) return <div className="loading-comments">Loading comments...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="comments-container">
      <div className="comment-form-container">
        {editingComment ? (
          <>
            <h3>Edit Comment</h3>
            <CommentForm 
              initialData={editingComment}
              onSubmit={handleUpdateComment}
              onCancel={() => setEditingComment(null)}
            />
          </>
        ) : (
          <>
            <h3>Add a Comment</h3>
            <CommentForm onSubmit={handleAddComment} />
          </>
        )}
      </div>

      <div className="comments-list">
        {comments.length > 0 ? (
          comments.map(comment => (
            <div key={comment._id} className="comment">
              <div className="comment-header">
                <div className="comment-author">
                  <strong>{comment.name}</strong>
                  {comment.email && <span> ({comment.email})</span>}
                </div>
                <div className="comment-date">{formatDate(comment.date)}</div>
              </div>
              <div className="comment-text">{comment.text}</div>
              <div className="comment-actions">
                <button 
                  onClick={() => setEditingComment(comment)} 
                  className="btn btn-small btn-edit"
                >
                  Edit
                </button>
                <button 
                  onClick={() => handleDeleteComment(comment._id)} 
                  className="btn btn-small btn-delete"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No comments yet. Be the first to comment!</p>
        )}
      </div>
    </div>
  );
}

export default CommentList;