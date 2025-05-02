import React from 'react';

const CommentList = ({ comments, onEdit, onDelete }) => {
  if (!comments || comments.length === 0) {
    return <p>No comments yet.</p>;
  }

  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="comment-list">
      {comments.map((comment) => (
        <div key={comment._id} className="comment">
          <div className="comment-header">
            <span className="comment-name">{comment.name}</span>
            <span className="comment-date">
              {comment.date ? formatDate(comment.date) : 'Unknown date'}
            </span>
          </div>
          <div className="comment-text">{comment.text}</div>

          <div className="comment-actions">
            <button onClick={() => onEdit(comment)} className="edit-button">
              Edit
            </button>
            <button onClick={() => onDelete(comment._id)} className="delete-button">
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommentList;
