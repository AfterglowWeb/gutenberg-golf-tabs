import { __ } from '@wordpress/i18n';
import { 
	useBlockProps, 
	InspectorControls,
	RichText,
	MediaUpload, 
	MediaUploadCheck
} from '@wordpress/block-editor';
import { 
	PanelBody, 
	TextControl,
	ImageControl
} from '@wordpress/components';
import { 
	useState, 
	useEffect
} from '@wordpress/element';
import { 
	Box, 
	Tabs, 
	Tab, 
	Typography, 
	Button,
	Paper
} from '@mui/material';

import TabContent from './components/TabContent';

export default function Edit({attributes, setAttributes}) {
	
	const [selectedTab, setSelectedTab] = useState(0);
	const [editingContent, setEditingContent] = useState(null);


	useEffect(() => {
        if (!attributes.tabs || !Array.isArray(attributes.tabs)) {
            setAttributes({ tabs: [] });
        }
    }, []);

	const handleAddTab = () => {
        const tabs = [ ...attributes.tabs || [] ];
        tabs.push( {
            title: '',
			subtitle: '',
			meta_1: '',
			meta_2: '',
			content: '',
			mediaId: 0,
			mediaUrl: '',
			starts: {
                white: 0,
                yellow: 0,
                blue: 0,
                red: 0,
                orange: 0
            }
        } );
        setAttributes( { tabs } );
    };

    const handleRemoveTab = ( index ) => {
        const tabs = [ ...attributes.tabs ];
        tabs.splice( index, 1 );
        setAttributes( { tabs } );
    };

    const handleTabValueChange = ( value, key, index ) => {
		console.log(value, key, index);
        const tabs = [ ...attributes.tabs ];
        tabs[ index ][key] = value;
        setAttributes( { tabs } );
    };

	const handleStartsValueChange = (value, color, index) => {
		const tabs = [ ...attributes.tabs ];
		if (!tabs[index].starts) {
			tabs[index].starts = {
				white: 0,
				yellow: 0,
				blue: 0,
				red: 0,
				orange: 0
			};
		}
		tabs[index].starts[color] = parseInt(value) || 0;
		setAttributes({ tabs });
	};

	const handleContentChange = ( value, index ) => {
		const tabs = [ ...attributes.tabs ];
		tabs[ index ].content = value;
		setAttributes( { tabs } );
	};

	const removeMedia = ( index ) => {
		const tabs = [ ...attributes.tabs ];
        tabs[ index ].mediaId = 0;
		tabs[ index ].mediaUrl = '';
        setAttributes( { tabs } );
	}

	const onSelectMedia = (media , index) => {
		const tabs = [ ...attributes.tabs ];
        tabs[ index ].mediaId = media.id;
		tabs[ index ].mediaUrl =  media.url;
        setAttributes( { tabs } );
	}

	const handleTabChange = (event, newValue) => {
		setSelectedTab(newValue);
	  };

	function CustomTabPanel({children, selectedTab, value, index}) {
	  return (
		<div
		  role="tabpanel"
		  hidden={value !== selectedTab}
		  id={value}
		  aria-labelledby={`${index} ${value}`}
		>
		  {value === selectedTab && <Paper sx={{ p: 3 }}>{children}</Paper>}
		</div>
	  )
	}
	

	const tabFields = (attributes.tabs || []).map( ( tab, index ) => {
		return (<Paper key={ index } className="p-2 mb-4" elevation={3}>
			
			<div className="mb-2 flex justify-between">
				<h3 className="lowercase">{__('Onglet')} {index + 1}</h3>
				<Button 
				variant="outlined" 
				size="small" 
				sx={{textTransform:"none"}} 
				onClick={() => handleRemoveTab(index)} >
					{ __( 'Supprimer' ) }
				</Button>
			</div>
			<div className="mb-2">
				<PanelBody title={__('Textes')} initialOpen={true}>
					<TextControl
						placeholder="Titre"
						value={ tab?.title || '' }
						onChange={ ( value ) => {handleTabValueChange(value, 'title', index)} }
					/>
					<TextControl
						placeholder="Sous-titre"
						value={ tab?.subtitle }
						onChange={ ( value ) => {handleTabValueChange(value, 'subtitle', index)} }
					/>
					<TextControl
						placeholder="Donnée 1"
						value={ tab?.meta_1 }
						onChange={ ( value ) => {handleTabValueChange(value, 'meta_1', index)} }
					/>
					<TextControl
						placeholder="Donnée 2"
						value={ tab?.meta_2 }
						onChange={ ( value ) => {handleTabValueChange(value, 'meta_2', index)} }
					/>
				</PanelBody>
			</div>

			<div className="mb-2">
				<PanelBody title={__('Image')} initialOpen={false}>
					<MediaUploadCheck>
						<MediaUpload
							onSelect={ ( media ) => {onSelectMedia(media, index)} }
							allowedTypes={ ['image'] }
							value={ tab?.mediaId }
							render={ ( { open } ) => (
								<Button onClick={ open }>{__('Sélectionner une image')}</Button>
							) }
						/>
					</MediaUploadCheck>
					{tab?.mediaId != 0 && 
						<MediaUploadCheck>
							<Button 
							variant="outlined" 
							size="small" 
							sx={{textTransform:"none"}} 
							onClick={() => {removeMedia(index)}}>{__('Supprimer l\'image')}</Button>
						</MediaUploadCheck>
					}
				</PanelBody>
			</div>

			<div className="mb-2">
				<PanelBody title={__('Distances de départ')} initialOpen={false}>
					<div className="flex flex-wrap">
						<TextControl
							type="number"
							label={
								<span className="block p-1 text-center rounded-lg border-2 border-solid border-slate-200 bg-yellow-400">
									{__('Jaune')}
								</span>
							}
							className="w-1/3 p-1"
							value={tab?.starts?.yellow || ''}
							onChange={(value) => handleStartsValueChange(value, 'yellow', index)}
						/>
						<TextControl
							type="number"
							label={
								<span className="block p-1 text-center rounded-lg border-2 border-solid border-slate-200 bg-blue-400">
									{__('Bleu')}
								</span>
							}
							className="w-1/3 p-1"
							value={tab?.starts?.blue || ''}
							onChange={(value) => handleStartsValueChange(value, 'blue', index)}
						/>
						<TextControl
							type="number"
							label={
								<span className="block p-1 text-center rounded-lg border-2 border-solid border-slate-200 bg-red-400">
									{__('Rouge')}
								</span>
							}
							className="w-1/3 p-1"
							value={tab?.starts?.red || ''}
							onChange={(value) => handleStartsValueChange(value, 'red', index)}
						/>
						<TextControl
							type="number"
							label={
								<span className="block p-1 text-center rounded-lg border-2 border-solid border-slate-200 bg-orange-400">
									{__('Orange')}
								</span>
							}
							className="w-1/3 p-1"
							value={tab?.starts?.orange || ''}
							onChange={(value) => handleStartsValueChange(value, 'orange', index)}
						/>
					</div>
				</PanelBody>
			</div>

			
		</Paper>)
	} );

	const tabNavigationItems = (attributes.tabs || []).map( ( tab, index ) => {
		return <Tab 
		key={index}
		label={
			<Box sx={{ display: 'flex', flexDirection: 'column' }}>
			{tab?.title && (
				<Typography component="span" variant="title" fontWeight="medium">
				{tab.title}
				</Typography>
			)}
			{tab?.subtitle && (
				<Typography component="span" variant="subtitle1" fontWeight="medium">
				{tab.subtitle}
				</Typography>
			)}
			{tab?.meta_1 && (
				<Typography component="span" variant="body2" color="text.secondary">
				{tab.meta_1}
				</Typography>
			)}
			{tab?.meta_2 && (
				<Typography component="span" variant="body2" color="text.secondary">
				{tab.meta_2}
				</Typography>
			)}
			</Box>
		}
		>
		</Tab>;
	} );
/*
	const tabContents = (attributes.tabs || []).map( ( tab, index ) => {


			const content = editingContent !== null && editingContent.index === index 
			? editingContent.content 
			: tab?.content || '';


			return(
				<CustomTabPanel 
				key={'panel-' + index + tab.title} 
				selectedTab={selectedTab} 
				value={index} 
				index={index}>
					
					<div className="flex justify-between">
						<div>
							{tab.title && <p>{tab.title}</p>}
							{tab.subtitle && <p>{tab.subtitle}</p>}
						</div>
						<div>
							{tab.meta_1 && <p>{tab.meta_1}</p>}
							{tab.meta_2 && <p>{tab.meta_2}</p>}
						</div>
					</div>
				
					<div className="flex justify-start gap-4">
						<div className="w-1/2">
							<RichText
							tagName="p"
							placeholder={ __( 'Écrivez ici.' ) }
							value={content}
							allowedFormats={ [ 'core/bold', 'core/italic' ] }
							onBlur={(value, index) => { handleTabValueChange(value, 'content', index) }}
							/>
						</div>
						
						<div className="w-1/2 h-1/2">
							{tab.mediaUrl && <img src={tab.mediaUrl} alt={tab.title} className="w-full h-full object-cover" />}
						</div>
					</div>
					{tab.starts && 
					<div className="flex gap-2">
						{tab.starts.white && <span 
						className="block p-1 text-center rounded-lg border-2 border-solid border-slate-200 bg-white"
						>{tab.starts.white}</span>}

						{tab.starts.yellow && <span 
						className="block p-1 text-center rounded-lg border-2 border-solid border-slate-200 bg-yellow-400"
						>{tab.starts.yellow}</span>}

						{tab.starts.blue && <span 
						className="block p-1 text-center rounded-lg border-2 border-solid border-slate-200 bg-blue-400"
						>{tab.starts.blue}</span>}

						{tab.starts.red && <span 
						className="block p-1 text-center rounded-lg border-2 border-solid border-slate-200 bg-red-400"
						>{tab.starts.red}</span>}

						{tab.starts.orange && <span 
						className="block p-1 text-center rounded-lg border-2 border-solid border-slate-200 bg-orange-400"
						>{tab.starts.orange}</span>}
					</div>}
				</CustomTabPanel>
			)
	} );*/

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Onglets' ) }>
					{tabFields}
					<Button 
					variant="contained" 
					size="small" 
					color="info"
					sx={{textTransform:"none"}}
					onClick={handleAddTab} >
						{ __( 'Ajouter un onglet' ) }
					</Button>
				</PanelBody>
			</InspectorControls>

			<div { ...useBlockProps() }>
	
				<Tabs
				value={selectedTab}
				onChange={handleTabChange}
				variant="scrollable"
				scrollButtons="auto"
				aria-label="detailed list tabs"
				sx={{
					mb: 3
				}}
				>
					{tabNavigationItems}
				</Tabs>

				{attributes.tabs?.map((tab, index) => (
					<TabContent
						key={index}
						tab={tab}
						index={index}
						selectedTab={selectedTab}
						editingContent={editingContent}
						setEditingContent={setEditingContent}
						handleTabValueChange={handleTabValueChange}
					/>
				))}
			</div>

		</>

	);
	
}