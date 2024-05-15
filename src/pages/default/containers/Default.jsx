import React from 'react';
import Typography from 'components/Typography';
import { Link } from 'react-router-dom';

function Default() {
  return (
      <div>
          <Typography variant="title">Title</Typography>
          <div>
              <Typography variant="body">Short project description</Typography>
          </div>
          <div>
              <Link to="/entity-list">Go to Entity List</Link>
          </div>

          <div>
              <Link to="/entity-edit">Go to Entity Edit</Link>
          </div>
          <div>
              <Typography>Author: Your Name</Typography>
              <Typography>&copy; 2024 All rights reserved.</Typography>
          </div>
      </div>
  );
}

export default Default;
