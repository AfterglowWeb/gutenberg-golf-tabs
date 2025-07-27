import { useState } from '@wordpress/element';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Container from '@mui/material/Container';
import Fab from '@mui/material/Fab';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import AddIcon from '@mui/icons-material/Add';
import SectionBackground from './SectionBackground';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';


export default function FrontendTabs(props) {

  const {title, subtitle, tabs, background, align} = props;
  const [activeTab, setActiveTab] = useState(0);
  const [open, setOpen] = useState(false);
  
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  if (!tabs) {
    return <div>Pas d'onglets configurés.</div>;
  }
  
  if (tabs.length === 0) {
    return <div>Pas d'onglets configurés.</div>;
  }

  
  return (
  <Box 
  component="section"
  sx={{
    backgroundColor: 'var(--wp--preset--color--secondary-dark)',
    textAlign: align || 'center',
    position: 'relative',
    overflow: 'hidden',
    my:{ xs: 4, lg: 0 },
    py: { xs: 6, lg: 12 },
    px: { xs: 0, lg: 'var(--wp--preset--spacing--t-gutter)' }
  }}
  >
    <SectionBackground {...props} />
    <Container maxWidth={false} disableGutters={true} sx={{position: 'relative', zIndex: 10, px: 0}}>

      {(title || subtitle) && 
      <Box className="text-center w-full"> 
          {title && 
          <Typography 
          comonent="h3" 
          sx={{
            color: 'white',
            fontWeight: 700,
            fontFamily: 'var(--wp--preset--font-family--theme-bold)',
            fontSize: 'var(--wp--preset--font-size--xxxxx-large)',
            px: {xs: 6, lg: 0},
            pb: 2,
            }}>
            {title}
          </Typography>}

          {subtitle && <p className="font-bold text-xl text-[30px] mb-0">
              <strong>{subtitle}</strong>
          </p>}
      </Box>}

      <Box sx={({theme}) => ({
        borderRadius: '2px',
        overflow: 'hidden',
      })}>

        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          allowScrollButtonsMobile={true}
          sx={{ 
            backgroundColor: 'white',
            borderRadius: '0px',
            '& .MuiTabs-indicator': {
              backgroundColor: 'secondary.main',
              height: '3px',
            },
           }}
        >
          {tabs.map((tab, index) => (
            <Tab 
            key={index}
            label={
              <Box sx={{ height:'100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className="block">
                {tab?.title && (
                  <span className="block normal-case font-bold text-xl md:text-2xl text-slate-900">
                  {tab.title}
                  </span>
                )}
                {tab?.subtitle && (
                  <span className="block normal-case font-bold text-xl md:text-2xl text-teal-700">
                  {tab.subtitle}
                  </span>
                )}
                </span>
        
                <span className="block">
                {tab?.meta_1 && (
                  <span className="block font-regular text-md text-slate-500">
                  {tab.meta_1}
                  </span>
                )}
                {tab?.meta_2 && (
                  <span className="block font-regular text-md text-slate-500">
                  {tab.meta_2}
                  </span>
                )}
                </span>
              </Box>
            }
            >
            </Tab>
          ))}
        </Tabs>
        
        {tabs.map((tab, index) => (
          <CustomTabPanel key={index} value={activeTab} index={index}>
              
              <div className="block w-full md:flex justify-start flex-wrap">
                
                <div className={`w-full p-2 md:p-4 ${tab.mediaUrl && 'md:w-1/2'}`}>
                
                  <h3 className="block md:flex items-center mb-2 gap-4">
                    <span className="block md:flex gap-2 items-end">
                      {tab.title && <span className="block text-2xl font-bold">{tab.title}</span>}
                      {tab.subtitle && <span className="block text-2xl text-secondary font-bold">{tab.subtitle}</span>}
                    </span>
                    <span className="block md:flex gap-2 items-center">
                      {tab.meta_1 && <span className="block text-xl font-regular">{tab.meta_1}</span>}
                      {tab.meta_2 && <span className="block text-xl font-regular">{tab.meta_2}</span>}
                    </span>
                  </h3>

                  <div dangerouslySetInnerHTML={{ __html: tab.content }} />
                  
                  {tab.starts && Object.values(tab.starts).some(val => val !== 0) && (
                    <div>
                      <h3 className="py-4">
                        <span className="block text-lg font-bold">Départs</span>
                      </h3>
                      <div className="flex flex-wrap gap-2 font-regular text-sm">
                        {tab.starts.white > 0 && (
                          <span className="block w-10 p-1 text-center rounded-lg border-2 border-solid border-slate-200 bg-white">
                            {tab.starts.white}
                          </span>
                        )}
                        {tab.starts.yellow > 0 && (
                          <span className="block w-10 p-1 text-center rounded-lg border-2 border-solid border-slate-200 bg-yellow-400">
                            {tab.starts.yellow}
                          </span>
                        )}
                        
                        {tab.starts.blue > 0 && (
                          <span className="block w-10 p-1 text-center rounded-lg border-2 border-solid border-slate-200 bg-blue-400">
                            {tab.starts.blue}
                          </span>
                        )}
                  
                        {tab.starts.red > 0 && (
                          <span className="block w-10 p-1 text-center rounded-lg border-2 border-solid border-slate-200 bg-red-400" >
                            {tab.starts.red}
                          </span>
                        )}
                        
                        {tab.starts.orange > 0 && (
                          <span className="block w-10 p-1 text-center rounded-lg border-2 border-solid border-slate-200 bg-orange-400">
                            {tab.starts.orange}
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {tab.mediaUrl &&
                  <div className="w-full md:w-1/2 p-2 md:p-4">
                    <div 
                    className="relative cursor-pointer aspect-4/3 overflow-hidden"
                    onClick={() => setOpen(true)}
                    >
                      <img 
                        src={tab.mediaUrl} 
                        alt={tab.title || ''} 
                        className="object-cover h-full w-full aspect-4/3" 
                      />
                      <Fab 
                        color="primary" 
                        size="small"
                        sx={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 10, textTransform:'capitalize'}}
                      >
                        <AddIcon />
                      </Fab>
                    </div>
                    <Dialog
                    open={open}
                    onClose={() => setOpen(false)}
                    keepMounted={true}
                    fullScreen={true}
                    >
                      <DialogTitle sx={{display: 'flex', flexWrap:'wrap', justifyContent: 'space-between', alignItems: 'center'}}>
                        <span className="block overflow-hidden truncate">{tab.title} {tab.subtitle}</span>
                        <Fab size="small" color="primary" onClick={() => setOpen(false)}><CloseIcon /></Fab>
                      </DialogTitle>
                      <DialogContent dividers sx={{display: 'flex', justifyContent: 'center'}}>
                        <img 
                          src={tab.mediaUrl} 
                          alt={tab.title || ''} 
                          className="max-h-full h-full w-auto object-contain"
                        />
                      </DialogContent>
                      <DialogActions />
                    </Dialog>
                  </div>
                }
              </div>
          </CustomTabPanel>
        ))}

      </Box>
      
    </Container>
  </Box>
  );
}


function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && (
        <Paper sx={{ 
          p: {xs:1, md:3}, 
          borderRadius:0,
          }} elevation={2}>
          {children}
        </Paper>
      )}
    </div>
  );
}