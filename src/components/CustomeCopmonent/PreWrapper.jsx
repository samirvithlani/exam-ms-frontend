import React from 'react';

const PreWrapper = ({ htmlContent }) => (
  <pre dangerouslySetInnerHTML={{ __html: htmlContent }} />
);

export default PreWrapper;
