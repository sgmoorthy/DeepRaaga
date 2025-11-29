import {
  Box,
  Typography,
  Paper,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const CarnaticRagaInfo = () => {
  return (
    <Box sx={{ width: '100%', mt: 2 }}>
      <Typography variant="h4" gutterBottom sx={{ color: 'primary.main', fontWeight: 'bold' }}>
        Carnatic Ragas and Swaras
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={{ p: 3, mb: 3, bgcolor: 'background.paper' }}>
            <Typography variant="h5" gutterBottom color="secondary">
              Introduction to Carnatic Music
            </Typography>
            <Typography paragraph>
              Carnatic music is one of the two main subgenres of Indian classical music, with origins in South India. It is based on a complex system of Ragas (melodic frameworks) and Talas (rhythmic patterns). The foundation lies in the 72 Melakarta ragas, which are the parent scales from which thousands of Janya (derived) ragas are formed.
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          {/* Swaras Section */}
          <Accordion defaultExpanded>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6" color="primary">The 12 Swarasthanas (Note Positions)</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography paragraph>
                While there are 7 basic notes (Sapta Swaras: Sa, Ri, Ga, Ma, Pa, Dha, Ni), variations in these notes give rise to the 12 Swarasthanas. Sa and Pa are fixed (Achala Swaras), while the others have variations.
              </Typography>
              <TableContainer component={Paper} variant="outlined">
                <Table size="small">
                  <TableHead>
                    <TableRow sx={{ bgcolor: 'action.hover' }}>
                      <TableCell><strong>Swara</strong></TableCell>
                      <TableCell><strong>Name</strong></TableCell>
                      <TableCell><strong>Notation</strong></TableCell>
                      <TableCell><strong>Western Equivalent</strong></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow><TableCell>Shadjam</TableCell><TableCell>Shadjam</TableCell><TableCell>Sa</TableCell><TableCell>C</TableCell></TableRow>
                    <TableRow><TableCell rowSpan={3}>Rishabham</TableCell><TableCell>Shuddha Rishabham</TableCell><TableCell>Ri1</TableCell><TableCell>C# / Db</TableCell></TableRow>
                    <TableRow><TableCell>Chatushruti Rishabham</TableCell><TableCell>Ri2</TableCell><TableCell>D</TableCell></TableRow>
                    <TableRow><TableCell>Shatshruti Rishabham</TableCell><TableCell>Ri3</TableCell><TableCell>D# / Eb</TableCell></TableRow>
                    <TableRow><TableCell rowSpan={3}>Gandharam</TableCell><TableCell>Shuddha Gandharam</TableCell><TableCell>Ga1</TableCell><TableCell>D</TableCell></TableRow>
                    <TableRow><TableCell>Sadharana Gandharam</TableCell><TableCell>Ga2</TableCell><TableCell>D# / Eb</TableCell></TableRow>
                    <TableRow><TableCell>Antara Gandharam</TableCell><TableCell>Ga3</TableCell><TableCell>E</TableCell></TableRow>
                    <TableRow><TableCell rowSpan={2}>Madhyamam</TableCell><TableCell>Shuddha Madhyamam</TableCell><TableCell>Ma1</TableCell><TableCell>F</TableCell></TableRow>
                    <TableRow><TableCell>Prati Madhyamam</TableCell><TableCell>Ma2</TableCell><TableCell>F# / Gb</TableCell></TableRow>
                    <TableRow><TableCell>Panchamam</TableCell><TableCell>Panchamam</TableCell><TableCell>Pa</TableCell><TableCell>G</TableCell></TableRow>
                    <TableRow><TableCell rowSpan={3}>Dhaivatam</TableCell><TableCell>Shuddha Dhaivatam</TableCell><TableCell>Dha1</TableCell><TableCell>G# / Ab</TableCell></TableRow>
                    <TableRow><TableCell>Chatushruti Dhaivatam</TableCell><TableCell>Dha2</TableCell><TableCell>A</TableCell></TableRow>
                    <TableRow><TableCell>Shatshruti Dhaivatam</TableCell><TableCell>Dha3</TableCell><TableCell>A# / Bb</TableCell></TableRow>
                    <TableRow><TableCell rowSpan={3}>Nishadam</TableCell><TableCell>Shuddha Nishadam</TableCell><TableCell>Ni1</TableCell><TableCell>A</TableCell></TableRow>
                    <TableRow><TableCell>Kaisiki Nishadam</TableCell><TableCell>Ni2</TableCell><TableCell>A# / Bb</TableCell></TableRow>
                    <TableRow><TableCell>Kakali Nishadam</TableCell><TableCell>Ni3</TableCell><TableCell>B</TableCell></TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
              <Typography variant="caption" display="block" sx={{ mt: 1, fontStyle: 'italic' }}>
                Note: Due to overlapping frequencies, Ri2=Ga1, Ri3=Ga2, Dha2=Ni1, Dha3=Ni2 in the 12-note chromatic scale, but they are distinct in Carnatic theory based on the Raga context.
              </Typography>
            </AccordionDetails>
          </Accordion>

          {/* Melakarta Section */}
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6" color="primary">The 72 Melakarta System</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography paragraph>
                The 72 Melakarta ragas are organized into 12 groups called <strong>Chakras</strong>. Each Chakra contains 6 ragas. The grouping is based on the variations of Rishabham (Ri), Gandharam (Ga), Dhaivatam (Dha), and Nishadam (Ni), while Madhyamam (Ma) splits the system into two halves (Shuddha Ma: 1-36, Prati Ma: 37-72).
              </Typography>

              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold' }}>
                    Shuddha Madhyamam (Ma1) Ragas
                  </Typography>
                  <TableContainer component={Paper} variant="outlined">
                    <Table size="small">
                      <TableHead>
                        <TableRow sx={{ bgcolor: 'action.selected' }}>
                          <TableCell><strong>Chakra No.</strong></TableCell>
                          <TableCell><strong>Chakra Name</strong></TableCell>
                          <TableCell><strong>Ragas (Examples)</strong></TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow><TableCell>1</TableCell><TableCell>Indu</TableCell><TableCell>Kanakangi (1)</TableCell></TableRow>
                        <TableRow><TableCell>2</TableCell><TableCell>Netra</TableCell><TableCell>Ratnangi (2)</TableCell></TableRow>
                        <TableRow><TableCell>3</TableCell><TableCell>Agni</TableCell><TableCell>Ganamurthi (3)</TableCell></TableRow>
                        <TableRow><TableCell>4</TableCell><TableCell>Veda</TableCell><TableCell>Kharaharapriya (22)</TableCell></TableRow>
                        <TableRow><TableCell>5</TableCell><TableCell>Bana</TableCell><TableCell>Harikambhoji (28)</TableCell></TableRow>
                        <TableRow><TableCell>6</TableCell><TableCell>Rutu</TableCell><TableCell>Dheerasankarabharanam (29)</TableCell></TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold' }}>
                    Prati Madhyamam (Ma2) Ragas
                  </Typography>
                  <TableContainer component={Paper} variant="outlined">
                    <Table size="small">
                      <TableHead>
                        <TableRow sx={{ bgcolor: 'action.selected' }}>
                          <TableCell><strong>Chakra No.</strong></TableCell>
                          <TableCell><strong>Chakra Name</strong></TableCell>
                          <TableCell><strong>Ragas (Examples)</strong></TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow><TableCell>7</TableCell><TableCell>Rishi</TableCell><TableCell>Salagam (37)</TableCell></TableRow>
                        <TableRow><TableCell>8</TableCell><TableCell>Vasu</TableCell><TableCell>Jalarnavam (38)</TableCell></TableRow>
                        <TableRow><TableCell>9</TableCell><TableCell>Brahma</TableCell><TableCell>Shubhapantuvarali (45)</TableCell></TableRow>
                        <TableRow><TableCell>10</TableCell><TableCell>Disi</TableCell><TableCell>Ramapriya (52)</TableCell></TableRow>
                        <TableRow><TableCell>11</TableCell><TableCell>Rudra</TableCell><TableCell>Kamavardhini (51)</TableCell></TableRow>
                        <TableRow><TableCell>12</TableCell><TableCell>Aditya</TableCell><TableCell>Mechakalyani (65)</TableCell></TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>

          {/* The Trinity Section */}
          <Paper sx={{ p: 3, mt: 3, mb: 3, bgcolor: 'background.paper' }}>
            <Typography variant="h5" gutterBottom color="secondary" sx={{ textAlign: 'center' }}>
              The Trinity of Carnatic Music
            </Typography>
            <Grid container spacing={3} justifyContent="center">
              {[
                { name: 'Tyagaraja', desc: 'Known for his devotion to Rama and the Pancharatna Kritis.' },
                { name: 'Muthuswami Dikshitar', desc: 'Known for his Sanskrit compositions and intellectual depth.' },
                { name: 'Syama Sastri', desc: 'Known for his intricate rhythmic patterns and devotion to Kamakshi.' }
              ].map((composer, index) => (
                <Grid item xs={12} md={4} key={index}>
                  <Box sx={{
                    border: '2px solid #F1C40F',
                    borderRadius: '8px',
                    p: 2,
                    textAlign: 'center',
                    height: '100%',
                    bgcolor: '#FFF8E1'
                  }}>
                    <Box sx={{
                      width: '100%',
                      height: '200px',
                      bgcolor: '#ddd',
                      mb: 2,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: '4px'
                    }}>
                      <Typography variant="caption" color="text.secondary">Image of {composer.name}</Typography>
                    </Box>
                    <Typography variant="h6" color="primary">{composer.name}</Typography>
                    <Typography variant="body2">{composer.desc}</Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Paper>

          {/* Instruments Section */}
          <Paper sx={{ p: 3, mb: 3, bgcolor: 'background.paper' }}>
            <Typography variant="h5" gutterBottom color="secondary" sx={{ textAlign: 'center' }}>
              Traditional Instruments
            </Typography>
            <Grid container spacing={3} justifyContent="center">
              {[
                { name: 'Saraswati Veena', desc: 'A plucked string instrument, considered divine.' },
                { name: 'Mridangam', desc: 'The primary rhythmic accompaniment in Carnatic music.' },
                { name: 'Tampura', desc: 'Provides the drone (sruti) background.' }
              ].map((inst, index) => (
                <Grid item xs={12} md={4} key={index}>
                  <Box sx={{
                    border: '1px solid #D35400',
                    borderRadius: '8px',
                    p: 2,
                    textAlign: 'center',
                    height: '100%',
                    bgcolor: '#FFF3E0'
                  }}>
                    <Box sx={{
                      width: '100%',
                      height: '150px',
                      bgcolor: '#ddd',
                      mb: 2,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: '4px'
                    }}>
                      <Typography variant="caption" color="text.secondary">Image of {inst.name}</Typography>
                    </Box>
                    <Typography variant="h6" color="primary">{inst.name}</Typography>
                    <Typography variant="body2">{inst.desc}</Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CarnaticRagaInfo;