import React, { useEffect } from 'react';
import { Routes, Route, Link, useParams, useLocation } from 'react-router-dom';
import { Box, Typography, Divider, Grid, Card, CardActionArea, CardMedia, CardContent, Container, Breadcrumbs } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

// Import the raw markdown file directly via Vite
import musicAsCodeBlog from '../../docs/blog/07-music-as-code-philosophy.md?raw';
import contributeBlog from '../../docs/blog/06-how-to-contribute.md?raw';
import deepraagaCodeInternalsBlog from '../../docs/blog/05-deepraaga-code-internals.md?raw';
import futureTalaBlog from '../../docs/blog/04-the-future-of-tala.md?raw';
import democratizeBlog from '../../docs/blog/03-democratizing-music-education.md?raw';
import pmDiscussionBlog from '../../docs/blog/02-pm-discussion-vision.md?raw';
import deepDiveBlog from '../../docs/blog/01-deep-dive-ai-carnatic.md?raw';

const blogs = [
  {
    slug: 'music-as-code-philosophy',
    title: 'The "Music-as-Code" Philosophy: Redefining Carnatic AI',
    category: 'Philosophy',
    date: 'April 15, 2026',
    image: '/DeepRaaga/blog-images/music_as_code_hero.png',
    description: 'DeepRaaga pioneeringly treats Indian Classical Music as Code. Ragas are logical schemas, compositions are versioned artifacts, and pedagogy is CI/CD.',
    content: musicAsCodeBlog
  },
  {
    slug: 'how-to-contribute',
    title: 'Join the Chorus: How to Contribute to DeepRaaga',
    category: 'Open Source',
    date: 'April 14, 2026',
    image: '/DeepRaaga/blog-images/opensource_contribution.png',
    description: 'We need the collaborative power of ML engineers, React developers, and Carnatic musicians to build this National Knowledge Repository.',
    content: contributeBlog
  },
  {
    slug: 'deepraaga-code-internals',
    title: 'Inside the DeepRaaga Neural Engine: Code Internals',
    category: 'Engineering',
    date: 'April 13, 2026',
    image: '/DeepRaaga/blog-images/deepraaga_code_internals.png',
    description: 'Popping the hood to show exactly how the DeepRaaga core models operate on a code level from data ingestion to FASTApi generation.',
    content: deepraagaCodeInternalsBlog
  },
  {
    slug: 'pm-discussion-vision',
    title: 'Harmonizing Heritage: AI-Driven Preservation',
    category: 'Product Vision',
    date: 'April 10, 2026',
    image: 'https://img.youtube.com/vi/NynwiSIJmkE/maxresdefault.jpg',
    description: 'In a landmark conversation with the PM, the focus was clear: India’s musical heritage needs a digital backbone.',
    content: pmDiscussionBlog
  },
  {
    slug: 'democratizing-music-education',
    title: 'Democratizing Carnatic Music Education Through AI',
    category: 'Education',
    date: 'April 11, 2026',
    image: '/DeepRaaga/blog-images/ai_digital_shishya.png',
    description: 'Building a pedagogical tool meant to democratize classical music education on a global scale.',
    content: democratizeBlog
  },
  {
    slug: 'future-of-tala',
    title: 'Beyond Melody: The Computational Challenge of Carnatic Rhythm',
    category: 'Algorithms',
    date: 'April 12, 2026',
    image: '/DeepRaaga/blog-images/carnatic_rhythm_tala.png',
    description: 'Solving one of the most complex computational problems in musicology: generating Tala-aware sequences.',
    content: futureTalaBlog
  },
  {
    slug: 'deep-dive-ai-carnatic',
    title: 'Demystifying DeepRaaga: How AI Learns Grammar',
    category: 'Deep Learning',
    date: 'April 9, 2026',
    image: '/DeepRaaga/blog-images/carnatic_lstm_flow.png',
    description: 'Harmonizing traditional Indian Classical Music with Artificial Intelligence requires teaching the machine the profound, nuanced grammar.',
    content: deepDiveBlog
  }
];

const muiMarkdownComponents = {
  h1: ({ node, ...props }) => (
    <Typography 
      variant="h3" 
      component="h1"
      gutterBottom 
      sx={{ 
        mt: 4, 
        mb: 3, 
        fontWeight: 500,
        color: '#202124',
        fontFamily: '"Google Sans", "Roboto", sans-serif',
        lineHeight: 1.2
      }} 
      {...props} 
    />
  ),
  h2: ({ node, ...props }) => (
    <Typography 
      variant="h4" 
      gutterBottom 
      sx={{ mt: 5, mb: 2, fontWeight: 500, color: '#202124', fontFamily: '"Google Sans", "Roboto", sans-serif' }} 
      {...props} 
    />
  ),
  h3: ({ node, ...props }) => <Typography variant="h6" gutterBottom sx={{ mt: 4, mb: 1.5, color: '#202124', fontWeight: 500 }} {...props} />,
  p: ({ node, ...props }) => (
    <Typography 
      variant="body1" 
      paragraph 
      sx={{ 
        lineHeight: 1.8, 
        fontSize: '1.125rem', 
        color: '#3c4043',
        fontFamily: '"Google Sans Text", "Roboto", sans-serif',
        mb: 2.5
      }} 
      {...props} 
    />
  ),
  ul: ({ node, ...props }) => <Typography component="ul" sx={{ pl: 4, mb: 3, color: '#3c4043', fontSize: '1.125rem', lineHeight: 1.8 }} {...props} />,
  li: ({ node, ...props }) => <Typography component="li" variant="body1" sx={{ mb: 1.5 }} {...props} />,
  strong: ({ node, ...props }) => <strong style={{ color: '#202124', fontWeight: 700 }} {...props} />,
  hr: ({ node, ...props }) => <Divider sx={{ my: 5, borderColor: '#dadce0' }} {...props} />,
  img: ({ node, ...props }) => (
    <Box sx={{ my: 5, textAlign: 'center' }}>
      <Box
        component="img"
        sx={{ 
          maxWidth: '100%', 
          borderRadius: '8px',
          boxShadow: 'none',
          border: '1px solid #dadce0',
        }} 
        {...props} 
      />
    </Box>
  ),
  a: ({ node, ...props }) => {
    if (props.href && props.href.includes('youtube.com/watch?v=')) {
      const videoId = props.href.split('v=')[1].split('&')[0];
      return (
        <Box sx={{ my: 5, display: 'flex', justifyContent: 'center' }}>
          <Box
            sx={{
              borderRadius: '8px',
              overflow: 'hidden',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
              border: '1px solid #dadce0',
            }}
          >
            <iframe
              width="640"
              height="360"
              src={`https://www.youtube.com/embed/${videoId}`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </Box>
        </Box>
      );
    }
    return (
      <Box 
        component="a" 
        sx={{ 
          color: '#1a73e8', 
          textDecoration: 'none',
          '&:hover': { 
            textDecoration: 'underline'
          } 
        }} 
        {...props} 
      />
    );
  }
};

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'instant' });
}

function BlogFeed() {
  useEffect(() => { scrollToTop(); }, []);

  return (
    <Box sx={{ py: 4, bgcolor: '#ffffff', borderRadius: '16px', px: { xs: 2, md: 5 }, minHeight: '80vh' }}>
      <Typography variant="h3" sx={{ fontFamily: '"Google Sans", "Roboto", sans-serif', color: '#202124', mb: 1, fontWeight: 500 }}>
        The Keyword
      </Typography>
      <Typography variant="subtitle1" sx={{ color: '#5f6368', mb: 5, fontSize: '1.2rem' }}>
        The latest news from DeepRaaga.
      </Typography>

      <Grid container spacing={4}>
        {blogs.map((blog, index) => (
          <Grid item xs={12} md={index === 0 ? 12 : 4} key={blog.slug}>
            <Card 
              elevation={0} 
              sx={{ 
                borderRadius: '12px', 
                border: '1px solid #dadce0',
                transition: 'box-shadow 0.2s',
                '&:hover': {
                  boxShadow: '0 4px 12px 0 rgba(0,0,0,0.05)'
                },
                height: '100%',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <CardActionArea component={Link} to={`/blog/${blog.slug}`} sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'stretch', justifyContent: 'flex-start' }}>
                <CardMedia
                  component="img"
                  height={index === 0 ? "400" : "200"}
                  image={blog.image}
                  alt={blog.title}
                />
                <CardContent sx={{ flexGrow: 1, p: 3 }}>
                  <Typography variant="caption" sx={{ color: '#1a73e8', fontWeight: 600, letterSpacing: '0.5px', textTransform: 'uppercase', mb: 1, display: 'block' }}>
                    {blog.category}
                  </Typography>
                  <Typography gutterBottom variant={index === 0 ? "h4" : "h6"} sx={{ color: '#202124', fontFamily: '"Google Sans", sans-serif', fontWeight: 500, lineHeight: 1.3 }}>
                    {blog.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#5f6368', fontSize: '1rem', lineHeight: 1.6 }}>
                    {blog.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

function BlogPost() {
  const { slug } = useParams();
  const blog = blogs.find(b => b.slug === slug);
  
  useEffect(() => { scrollToTop(); }, [slug]);

  if (!blog) {
    return <Typography sx={{ p: 4, color: '#202124' }}>Article not found.</Typography>;
  }

  return (
    <Box sx={{ bgcolor: '#ffffff', borderRadius: '16px', py: { xs: 4, md: 8 } }}>
      <Container maxWidth="md">
        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb" sx={{ mb: 4 }}>
          <Link to="/blog" style={{ color: '#1a73e8', textDecoration: 'none', fontFamily: '"Google Sans", sans-serif' }}>
            The Keyword
          </Link>
          <Typography color="text.primary" sx={{ fontFamily: '"Google Sans", sans-serif' }}>
            {blog.category}
          </Typography>
        </Breadcrumbs>
        
        <Box sx={{ mb: 6 }}>
          <ReactMarkdown 
            remarkPlugins={[remarkGfm]} 
            components={muiMarkdownComponents}
          >
            {blog.content}
          </ReactMarkdown>
        </Box>
        
        <Divider sx={{ my: 4, borderColor: '#dadce0' }} />
        <Box sx={{ color: '#5f6368', fontFamily: '"Google Sans", sans-serif' }}>
          Published: {blog.date}
        </Box>
      </Container>
    </Box>
  );
}

export default function BlogViewer() {
  return (
    <Routes>
      <Route path="/" element={<BlogFeed />} />
      <Route path="/:slug" element={<BlogPost />} />
    </Routes>
  );
}
