import { registerBlockType } from '@wordpress/blocks';
import './style.scss';
import Edit from './edit';
import metadata from './block.json';
import './fonts.css';
import ThemePalette from './components/ThemePalette';

const EditWithTheme = (props) => (
	<ThemePalette>
	  <Edit {...props} />
	</ThemePalette>
  );

registerBlockType( metadata.name, {
	edit: EditWithTheme,
} );
