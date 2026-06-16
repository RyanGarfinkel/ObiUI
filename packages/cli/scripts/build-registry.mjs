import { copyFileSync, mkdirSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const REGISTRY_ENTRIES = [
	{ files: ['Accordion/Accordion.tsx'] },
	{ files: ['Alert/Alert.tsx'] },
	{ files: ['Avatar/Avatar.tsx'] },
	{ files: ['Badge/Badge.tsx'] },
	{ files: ['Breadcrumb/Breadcrumb.tsx'] },
	{ files: ['Button/Button.tsx'] },
	{ files: ['Canvas/Canvas.tsx'] },
	{ files: ['Card/Card.tsx'] },
	{ files: ['Carousel/Carousel.tsx'] },
	{ files: ['Charts/Charts.tsx'] },
	{ files: ['Checkbox/Checkbox.tsx'] },
	{ files: ['CodeBlock/CodeBlock.tsx'] },
	{ files: ['Collapsible/Collapsible.tsx'] },
	{ files: ['Combobox/Combobox.tsx'] },
	{ files: ['CommandPalette/CommandPalette.tsx'] },
	{ files: ['CountUp/CountUp.tsx'] },
	{ files: ['DataTable/DataTable.tsx', 'DataTable/Paginator.tsx'] },
	{ files: ['DatePicker/DatePicker.tsx'] },
	{ files: ['Drawer/Drawer.tsx'] },
	{ files: ['DropdownMenu/DropdownMenu.tsx'] },
	{ files: ['Form/Form.tsx'] },
	{ files: ['FunctionPlotter/FunctionPlotter.tsx'] },
	{ files: ['Graph/Graph.tsx'] },
	{ files: ['Input/Input.tsx'] },
	{ files: ['Kanban/Kanban.tsx'] },
	{ files: ['Modal/Modal.tsx'] },
	{ files: ['Mosaic/Mosaic.tsx'] },
	{ files: ['OTPInput/OTPInput.tsx'] },
	{ files: ['Popover/Popover.tsx'] },
	{ files: ['Progress/Progress.tsx'] },
	{ files: ['Radio/Radio.tsx'] },
	{ files: ['Reveal/Reveal.tsx'] },
	{ files: ['Select/Select.tsx'] },
	{ files: ['Sidebar/Sidebar.tsx'] },
	{ files: ['Skeleton/Skeleton.tsx'] },
	{ files: ['Slider/Slider.tsx'] },
	{ files: ['Spinner/Spinner.tsx'] },
	{ files: ['Switch/Switch.tsx'] },
	{ files: ['Table/Table.tsx'] },
	{ files: ['Tabs/Tabs.tsx'] },
	{ files: ['TextShimmer/TextShimmer.tsx'] },
	{ files: ['Textarea/Textarea.tsx'] },
	{ files: ['Timeline/Timeline.tsx'] },
	{ files: ['Toast/Toast.tsx'] },
	{ files: ['ToggleGroup/ToggleGroup.tsx'] },
	{ files: ['Tooltip/Tooltip.tsx'] },
	{ files: ['Tree/Tree.tsx'] },
	{ files: ['Typewriter/Typewriter.tsx'] },
];

const srcRoot = resolve(__dirname, '../../../src/components');
const registryRoot = resolve(__dirname, '../registry');

let copied = 0;
let skipped = 0;

for(const entry of REGISTRY_ENTRIES)
{
	for(const file of entry.files)
	{
		const src = resolve(srcRoot, file);
		const dest = resolve(registryRoot, file);

		if(!existsSync(src))
		{
			console.warn(`  skipped (not found): ${file}`);
			skipped++;
			continue;
		}

		mkdirSync(dirname(dest), { recursive: true });
		copyFileSync(src, dest);
		console.log(`  copied: ${file}`);
		copied++;
	}
}

console.log(`\nRegistry built: ${copied} file(s) copied, ${skipped} skipped.`);

const skillSrc = resolve(__dirname, '../../../dafink-ui.skill');
const skillDest = resolve(__dirname, '../assets/dafink-ui.skill');

if(existsSync(skillSrc))
{
	mkdirSync(dirname(skillDest), { recursive: true });
	copyFileSync(skillSrc, skillDest);
	console.log('Skill file bundled: dafink-ui.skill');
}
else
{
	console.warn('  skipped (not found): dafink-ui.skill');
}
