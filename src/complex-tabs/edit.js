import { __ } from '@wordpress/i18n';
import { 
	useBlockProps, 
	InspectorControls,
	MediaUpload, 
	MediaUploadCheck
} from '@wordpress/block-editor';
import { 
	PanelBody, 
	TextControl,
	CheckboxControl
} from '@wordpress/components';
import { 
	useState, 
	useEffect
} from '@wordpress/element';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import TabContent from './components/TabContent';
import SectionBackground from './components/SectionBackground';
import { ParallaxProvider } from 'react-scroll-parallax';

export default function Edit({attributes, setAttributes}) {
	
	const [selectedTab, setSelectedTab] = useState(0);
	const [editingContent, setEditingContent] = useState(null);

	useEffect(() => {
        if (!attributes.tabs || !Array.isArray(attributes.tabs)) {
            setAttributes({ tabs: [] });
        }

		if (!attributes.background || typeof attributes.background !== 'object') {
            setAttributes({ background: {
				isParallax: false,
				mediaId: 0,
				mediaUrl: '',
				mediaType: '',
				mediaAlt: ''
			} });
        }

		if (!attributes.blockId) {
			setAttributes({ blockId: crypto.randomUUID() });
		  }

    }, [attributes.tabs, attributes.background, setAttributes]);

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
			mediaType: '',
			mediaAlt: '',
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

	const removeTabMedia = ( index ) => {
		const tabs = [ ...attributes.tabs ];
        tabs[ index ].mediaId = 0;
		tabs[ index ].mediaUrl = '';
		tabs[ index ].mediaType = '';
		tabs[ index ].mediaAlt = '';
        setAttributes( { tabs } );
	}

	const onSelectTabMedia = (media , index) => {
		const tabs = [ ...attributes.tabs ];
        tabs[ index ].mediaId = media.id;
		tabs[ index ].mediaUrl =  media.url;
		tabs[ index ].mediaType = media.type;
		tabs[ index ].mediaAlt = media.alt;
        setAttributes( { tabs } );
	}

	const handleTabChange = (event, value) => {
		setSelectedTab(value);
	  };

	const onSelectMedia = (media, key) => {
		if (!media || !media.id) {
			console.error('Invalid media object received', media);
			return;
		}
		setAttributes({
			[key]: {
				isParallax: attributes[key]?.isParallax || false,
				mediaId: media.id,
				mediaUrl: media.url,
				mediaType: media.type,
				mediaAlt: media.alt
			}
		});
	};


	const removeMedia = (key) => {
		setAttributes({
			[key]: {
				isParallax: attributes[key]?.isParallax || false,
				mediaId: 0,
				mediaUrl: '',
				mediaType: '',
				mediaAlt: ''
			}
		});
	};

	const tabFields = (attributes.tabs || []).map( ( tab, index ) => {
		return (<Paper key={ index } className="p-2 mb-4" elevation={3}>
			
			<div className="mb-2 flex justify-between">
				<h3 className="lowercase">{__('Onglet')} {index + 1}</h3>
				<Button 
				variant="outlined" 
				size="small" 
				color="secondary"
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
							onSelect={ ( media ) => {onSelectTabMedia(media, index)} }
							allowedTypes={ ['image'] }
							value={ tab?.mediaId }
							render={ ( { open } ) => (
								<Button color="secondary" className="mb-2 bg-slate-50 aspect-video" onClick={ open }>
									{tab?.mediaUrl ? 
										<img src={tab?.mediaUrl} alt={tab?.title || ''} className="w-full h-full object-cover"/>
										 :
										__('Sélectionner une image')
									}
								</Button>
							) }
						/>
					</MediaUploadCheck>
					{tab?.mediaId != 0 && 
					<div className="mt-2">
						<MediaUploadCheck>
							<Button 
							color="secondary"
							variant="outlined" 
							size="small" 
							sx={{textTransform:"none"}} 
							onClick={() => {removeTabMedia(index)}}>{__('Supprimer l\'image')}</Button>
						</MediaUploadCheck>
					</div>
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
			<Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between' }}>
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
		</Tab>;
	} );

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Titre du bloc')} initialOpen={true}>
					<TextControl
						placeholder="Titre"
						value={attributes.title || ''}
						onChange={(value) => setAttributes({ title: value })}
					/>
					<TextControl
						placeholder="Sous-titre"
						value={attributes.subtitle || ''}
						onChange={(value) => setAttributes({ subtitle: value })}
					/>
				</PanelBody>
				<PanelBody title={ __( 'Onglets' ) }>
					{tabFields}
					<Button 
					variant="contained" 
					size="small" 
					color="secondary"
					sx={{textTransform:"none"}}
					onClick={handleAddTab} >
						{ __( 'Ajouter un onglet' ) }
					</Button>
				</PanelBody>
				<PanelBody title={__('Fond du bloc')} initialOpen={true}>
					<MediaUploadCheck>
						<MediaUpload
						onSelect={ ( media ) => {onSelectMedia(media, 'background')} }
						allowedTypes={ ['image'] }
						value={ attributes.background?.mediaId }
						render={ ( { open } ) => (
							<Button color="secondary" className="mb-2 bg-slate-50 aspect-video" onClick={ open }>
								{attributes.background?.mediaUrl ? 
									<img src={attributes.background?.mediaUrl} alt={attributes.background?.mediaAlt || ''} className="w-full h-full object-cover"/>
										:
									__('Sélectionner une image')
								}
							</Button>
						) }
						/>
					</MediaUploadCheck>
					{attributes.background?.mediaId != 0 && 
					<div className="mt-2">
						<MediaUploadCheck>
							<Button 
							color="secondary"
							variant="outlined" 
							size="small" 
							sx={{textTransform:"none"}} 
							onClick={() => {removeMedia('background')}}>{__('Supprimer l\'image')}</Button>
						</MediaUploadCheck>
					</div>
					}
					<CheckboxControl label="Effet parallaxe"
						__nextHasNoMarginBottom
						checked={ attributes.background?.isParallax }
						onChange={ (value) => 
							setAttributes({ 
								background: {
									...attributes.background, 
									isParallax : value
								} 
							}) 
						}/>
				</PanelBody>
			</InspectorControls>
			
			<ParallaxProvider>
				<div { ...useBlockProps() } className="p-4 md:p-6 lg:p-8 bg-primary-light relative overflow-hidden">
					<SectionBackground {...attributes} />
					<Container maxWidth="xl" sx={{position: 'relative', zIndex: 10}}>
						{attributes.title && 
						<Box 
						component="h2" 
						sx={{color:'secondary.main'}} 
						className={`font-bold text-3xl lg:text-[40px] lg:leading-[50px] mb-0`}>
							{attributes.title}
						</Box>}

						{attributes.subtitle && <p className="font-bold text-xl text-[30px] mb-0">
							<strong>{attributes.subtitle}</strong>
						</p>}
						
						<Box sx={({theme}) => ({
							backgroundColor: "white",
							borderRadius: '2px',
						})}>
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
						</Box>
					</Container>
				</div>
			</ParallaxProvider>

		</>

	);
	
}