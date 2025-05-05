import React, { useState } from 'react';

function CommentForm({ initialData = {}, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    name: initialData.name || '',
    email: initialData.email || '',
    text: initialData.text || ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    
    // Only clear the form if it's a new comment (not editing)
    if (!initialData._id) {
      setFormData({
        name: '',
        email: '',
        text: ''
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="comment-form">
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="name">Name*</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
      </div>
      
      <div className="form-group">
        <label htmlFor="text">Comment*</label>
        <textarea
          id="text"
          name="text"
          value={formData.text}
          onChange={handleChange}
          rows="4"
          required
        ></textarea>
      </div>
      
      <div className="form-actions">
        {onCancel && (
          <button 
            type="button" 
            onClick={onCancel} 
            className="btn btn-secondary"
          >
            Cancel
          </button>
        )}
        <button type="submit" className="btn btn-primary">
          {initialData._id ? 'Update Comment' : 'Add Comment'}
        </button>
      </div>
    </form>
  );
}

export default CommentForm;