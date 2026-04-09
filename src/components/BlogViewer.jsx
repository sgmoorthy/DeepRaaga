import React from 'react';
import { Box, Paper, Typography, Divider } from '@mui/material';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

// Import the raw markdown file directly via Vite
import deepDiveBlog from '../../docs/blog/01-deep-dive-ai-carnatic.md?raw';

const muiMarkdownComponents = {
  h1: ({ node, ...props }) => <Typography variant="h4" gutterBottom sx={{ mt: 3, mb: 2 }} {...props} />,
  h2: ({ node, ...props }) => <Typography variant="h5" gutterBottom sx={{ mt: 4, mb: 1.5 }} {...props} />,
  h3: ({ node, ...props }) => <Typography variant="h6" gutterBottom sx={{ mt: 3, mb: 1 }} {...props} />,
  p: ({ node, ...props }) => <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }} {...props} />,
  ul: ({ node, ...props }) => <Typography component="ul" sx={{ pl: 3, mb: 2 }} {...props} />,
  li: ({ node, ...props }) => <Typography component="li" variant="body1" sx={{ mb: 1 }} {...props} />,
  strong: ({ node, ...props }) => <strong style={{ color: '#BF360C' }} {...props} />,
  hr: ({ node, ...props }) => <Divider sx={{ my: 3 }} {...props} />,
  img: ({ node, ...props }) => (
    <Box sx={{ my: 3, textAlign: 'center' }}>
      <img style={{ maxWidth: '100%', borderRadius: '8px' }} {...props} />
    </Box>
  ),
  a: ({ node, ...props }) => <a style={{ color: '#D35400', textDecoration: 'none' }} {...props} />
};

export default function BlogViewer() {
  return (
    <Paper elevation={3} sx={{ p: 4, borderRadius: 2, mb: 4 }}>
      <Typography variant="overline" color="text.secondary" gutterBottom>
        Technical Documentation
      </Typography>
      <Box sx={{ mt: 2 }}>
        <ReactMarkdown 
          remarkPlugins={[remarkGfm]} 
          components={muiMarkdownComponents}
        >
          {deepDiveBlog}
        </ReactMarkdown>
      </Box>
    </Paper>
  );
}
