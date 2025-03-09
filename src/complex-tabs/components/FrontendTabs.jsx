import { useState } from '@wordpress/element';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Container from '@mui/material/Container';
import Fab from '@mui/material/Fab';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import AddIcon from '@mui/icons-material/Add';


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
        <Paper sx={{ p: 3, backgroundColor: 'oklch(0.968 0.007 247.896)' }} elevation={2}>
          {children}
        </Paper>
      )}
    </div>
  );
}

export default function FrontendTabs({ blockData }) {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = blockData?.tabs || [];
  const [open, setOpen] = useState(false);
  
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };
  
  if (tabs.length === 0) {
    return <div>No tabs available.</div>;
  }
  
  return (
    <Container maxWidth="xl">
      
      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        variant="scrollable"
        scrollButtons="auto"
        aria-label="complex tabs"
        sx={{ mb: 3 }}
      >
        {tabs.map((tab, index) => (
          <Tab 
          key={index}
          label={
            <Box sx={{ height:'100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between' }}>
              <span className="block">
              {tab?.title && (
                <span className="block normal-case font-bold text-xl md:text-4xl lg:text-5xl text-slate-900">
                {tab.title}
                </span>
              )}
              {tab?.subtitle && (
                <span className="block normal-case font-regular text-xl md:text-4xl lg:text-5xl text-teal-700">
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
            <h3 className="flex justify-between pb-4">
              <span className="block">
                {tab.title && <span className="block text-xl font-bold">{tab.title}</span>}
                {tab.subtitle && <span className="block text-2xl text-secondary font-regular">{tab.subtitle}</span>}
              </span>
              <span className="block">
                {tab.meta_1 && <span className="block text-xl font-regular">{tab.meta_1}</span>}
                {tab.meta_2 && <span className="block text-xl font-regular">{tab.meta_2}</span>}
              </span>
            </h3>
            
            <div className="flex justify-start flex-wrap border-y border-slate-50">
              <div className="w-full md:w-1/2 p-2 flex flex-col gap-4 justify-between">
                <div dangerouslySetInnerHTML={{ __html: tab.content }} />
                
                {tab.starts && Object.values(tab.starts).some(val => val > 0) && (
                  <div>
                    <h3 className="py-4">
                      <span className="block text-lg font-bold">Départs</span>
                    </h3>
                    <div className="flex gap-2 font-regular text-sm">
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
              
              <div className="w-full md:w-1/2 p-2">
                <div className="aspect-video">
                  <div 
                  className="relative cursor-pointer"
                  onClick={() => setOpen(true)}
                  >
                    {tab.mediaUrl && (
                      <img 
                        src={tab.mediaUrl} 
                        alt={tab.title || ''} 
                        className="aspect-video object-cover" 
                      />
                    )}
                    <Fab 
                      color="primary" 
                      size="small"
                      variant="extended"
                      sx={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 10, textTransform:'capitalize'}}
                    >
                      Détail
                      <AddIcon />
                    </Fab>
                  </div>
                  </div>
                  <Dialog
                    open={open}
                    onClose={() => setOpen(false)}
                    keepMounted={true}
                  >
                    <DialogTitle>{tab.title} {tab.subtitle}</DialogTitle>
                    <DialogContent dividers>
                      <img 
                        src={tab.mediaUrl} 
                        alt={tab.title || ''} 
                        className="max-h-[70svh] h-[70svh] w-auto object-contain"
                      />
                    </DialogContent>
                    <DialogActions>
                      <Button variant="contained" onClick={() => setOpen(false)}>Fermer</Button>
                    </DialogActions>
                  </Dialog>
              </div>
            </div>
          </CustomTabPanel>
      ))}
      
      </Container>
  );
}