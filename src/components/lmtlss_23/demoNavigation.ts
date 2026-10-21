// Sinh tự động từ sidebar của template Limitless (index.html): 345 link demo.
// Dự án thật: copy file này thành navigation.ts, giữ lại mục cần dùng và truyền vào <LimitlessLayout navigation={...}>.
import type { NavNode } from './navTypes'

// Trang dashboard demo đang chạy ở /lmtlss_23/ nên mục "trang chủ" phải trỏ đúng đường dẫn này
// (NavLink dùng `end`, nếu để '/' thì Dashboard sẽ không được tô active).
const BASE_PATH = '/lmtlss_23'
const HOME = `${BASE_PATH}/`

const withBasePath = (path: string): string => {
  if (path === '#') {
    return path
  }

  // Chuẩn hóa route: dùng dấu gạch ngang thay cho dấu gạch dưới.
  // Giữ nguyên BASE_PATH vì đây là đường dẫn thư mục gốc của ứng dụng.
  if (path === BASE_PATH || path.startsWith(`${BASE_PATH}/`)) {
    return `${BASE_PATH}${path.slice(BASE_PATH.length).replace(/_/g, '-')}`
  }

  const normalizedPath = path.replace(/_/g, '-')
  return `${BASE_PATH}${normalizedPath.startsWith('/') ? normalizedPath : `/${normalizedPath}`}`
}

const navigationItems: NavNode[] = [
  {type: 'header', title: 'Main'},
  {type: 'link', label: 'Dashboard', to: HOME, icon: 'home4'},
  {
    type: 'group', label: "Layouts", icon: "copy",
    children: [
      {type: 'link', label: 'Default layout', to: HOME},
      {type: 'link', label: 'Layout 2', to: '/layout-2-LTR-default-full'},
      {type: 'link', label: 'Layout 3', to: '/layout-3-LTR-default-full'},
      {type: 'link', label: 'Layout 4', to: '/layout-4-LTR-default-full'},
      {type: 'link', label: 'Layout 5', to: '/layout-5-LTR-default-full'},
      {type: 'link', label: 'Layout 6', to: '/layout-6-LTR-default-full', badge: {text: 'Coming soon'}, disabled: true},
    ],
  },
  {
    type: 'group', label: "Themes", icon: "color-sampler",
    children: [
      {type: 'link', label: 'Default', to: HOME},
      {type: 'link', label: 'Material', to: '/LTR-material-full'},
      {type: 'link', label: 'Dark', to: '/LTR-dark-full'},
      {type: 'link', label: 'Clean', to: '/LTR-clean-full', badge: {text: 'Coming soon'}, disabled: true},
    ],
  },
  {
    type: 'group', label: "Starter kit", icon: "stack",
    children: [
      {type: 'link', label: 'Horizontal navigation', to: '/layout-nav-horizontal'},
      {type: 'link', label: 'No sidebar', to: '/sidebar-none'},
      {type: 'link', label: '1 sidebar', to: '/sidebar-main'},
      {
        type: 'group', label: "2 sidebars",
        children: [
          {type: 'link', label: 'Secondary sidebar', to: '/sidebar-secondary'},
          {type: 'link', label: 'Right sidebar', to: '/sidebar-right'},
        ],
      },
      {
        type: 'group', label: "3 sidebars",
        children: [
          {type: 'link', label: 'Right sidebar hidden', to: '/sidebar-right-hidden'},
          {type: 'link', label: 'Right sidebar visible', to: '/sidebar-right-visible'},
        ],
      },
      {
        type: 'group', label: "Content sidebars",
        children: [
          {type: 'link', label: 'Left sidebar', to: '/sidebar-content-left'},
          {type: 'link', label: 'Right sidebar', to: '/sidebar-content-right'},
        ],
      },
      {type: 'link', label: 'Boxed layout', to: '/layout-boxed'},
      {type: 'divider'},
      {type: 'link', label: 'Fixed main navbar', to: '/navbar-fixed-main'},
      {type: 'link', label: 'Fixed secondary navbar', to: '/navbar-fixed-secondary'},
      {type: 'link', label: 'Both navbars fixed', to: '/navbar-fixed-both'},
      {type: 'link', label: 'Fixed layout', to: '/layout-fixed'},
    ],
  },
  {type: 'link', label: 'Changelog', to: '/changelog', icon: 'list-unordered', badge: {text: '2.3', color: 'blue-400'}},
  {type: 'link', label: 'RTL version', to: '/RTL-default-full', icon: 'width'},
  {type: 'header', title: 'Forms'},
  {
    type: 'group', label: "Form components", icon: "pencil3",
    children: [
      {type: 'link', label: 'Basic inputs', to: '/lmtlss_23/form-inputs'},
      {type: 'link', label: 'Checkboxes & radios', to: '/form-checkboxes-radios'},
      {type: 'link', label: 'Select2 selects', to: '/form-select2'},
      {type: 'link', label: 'Bootstrap multiselect', to: '/form-multiselect'},
      {type: 'link', label: 'Input groups', to: '/form-input-groups'},
      {type: 'link', label: 'Extended controls', to: '/form-controls-extended'},
      {type: 'link', label: 'Floating labels', to: '/form-floating-labels'},
      {type: 'link', label: 'Tag inputs', to: '/form-tag-inputs'},
      {type: 'link', label: 'Dual Listboxes', to: '/form-dual-listboxes'},
      {type: 'link', label: 'Validation', to: '/form-validation'},
      {type: 'link', label: 'Form wizard', to: '/form-wizard'},
      {type: 'link', label: 'Form actions', to: '/form-actions'},
      {type: 'link', label: 'Inputs grid', to: '/form-inputs-grid'},
    ],
  },
  {
    type: 'group', label: "JSON forms", icon: "file-css",
    children: [
      {type: 'link', label: 'Basic inputs', to: '/alpaca-basic'},
      {type: 'link', label: 'Advanced inputs', to: '/alpaca-advanced'},
      {type: 'link', label: 'Controls', to: '/alpaca-controls'},
    ],
  },
  {
    type: 'group', label: "Text editors", icon: "spell-check",
    children: [
      {type: 'link', label: 'Summernote editor', to: '/editor-summernote'},
      {type: 'link', label: 'CKEditor', to: '/editor-ckeditor'},
      {type: 'link', label: 'Trumbowyg editor', to: '/editor-trumbowyg'},
      {type: 'link', label: 'Code editor', to: '/editor-code'},
    ],
  },
  {
    type: 'group', label: "Pickers", icon: "select2",
    children: [
      {type: 'link', label: 'Date & time pickers', to: '/picker-date'},
      {type: 'link', label: 'Color pickers', to: '/picker-color'},
      {type: 'link', label: 'Location pickers', to: '/picker-location'},
    ],
  },
  {
    type: 'group', label: "Form layouts", icon: "insert-template",
    children: [
      {type: 'link', label: 'Vertical form', to: '/form-layout-vertical'},
      {type: 'link', label: 'Custom styles', to: '/form-layout-vertical-styled', badge: {text: 'Coming soon'}, disabled: true},
      {type: 'divider'},
      {type: 'link', label: 'Horizontal form', to: '/form-layout-horizontal'},
      {type: 'link', label: 'Custom styles', to: '/form-layout-horizontal-styled', badge: {text: 'Coming soon'}, disabled: true},
    ],
  },
  {type: 'header', title: 'Components'},
  {
    type: 'group', label: "Basic components", icon: "grid",
    children: [
      {type: 'link', label: 'Modals', to: '/lmtlss_23/components-modals'},
      {type: 'link', label: 'Dropdown menus', to: '/lmtlss_23/components-dropdowns'},
      {type: 'link', label: 'Tabs component', to: '/lmtlss_23/components-tabs'},
      {type: 'link', label: 'Pills component', to: '/lmtlss_23/components-pills'},
      {type: 'link', label: 'Collapsible', to: '/lmtlss_23/components-collapsible'},
      {type: 'link', label: 'Navs', to: '/lmtlss_23/components-navs'},
      {type: 'link', label: 'Buttons', to: '/lmtlss_23/components-buttons'},
      {type: 'link', label: 'Tooltips and popovers', to: '/lmtlss_23/components-popups'},
      {type: 'link', label: 'Alerts', to: '/lmtlss_23/components-alerts'},
      {type: 'link', label: 'Pagination', to: '/lmtlss_23/components-pagination'},
      {type: 'link', label: 'Badges', to: '/lmtlss_23/components-badges'},
      {type: 'link', label: 'Progress', to: '/lmtlss_23/components-progress'},
      {type: 'link', label: 'Breadcrumbs', to: '/lmtlss_23/components-breadcrumbs'},
      {type: 'link', label: 'Media objects', to: '/lmtlss_23/components-media'},
      {type: 'link', label: 'Scrollspy', to: '/lmtlss_23/components-scrollspy'},
    ],
  },
  {
    type: 'group', label: "Content styling", icon: "puzzle2",
    children: [
      {type: 'link', label: 'Page header', to: '/content-page-header'},
      {type: 'link', label: 'Page footer', to: '/content-page-footer', badge: {text: 'Coming soon'}, disabled: true},
      {type: 'divider'},
      {type: 'link', label: 'Cards', to: '/content-cards'},
      {type: 'link', label: 'Card content', to: '/content-cards-content'},
      {type: 'link', label: 'Card layouts', to: '/content-cards-layouts'},
      {type: 'link', label: 'Card header elements', to: '/content-cards-header'},
      {type: 'link', label: 'Card footer elements', to: '/content-cards-footer'},
      {type: 'link', label: 'Draggable cards', to: '/content-cards-draggable'},
      {type: 'divider'},
      {type: 'link', label: 'Text styling', to: '/content-text-styling'},
      {type: 'link', label: 'Typography', to: '/content-typography'},
      {type: 'link', label: 'Helper classes', to: '/content-helpers'},
      {type: 'link', label: 'Flex utilities', to: '/content-helpers-flex'},
      {type: 'link', label: 'Syntax highlighter', to: '/content-syntax-highlighter'},
      {type: 'link', label: 'Grid system', to: '/content-grid'},
    ],
  },
  {
    type: 'group', label: "Extra components", icon: "gift",
    children: [
      {type: 'link', label: 'PNotify notifications', to: '/extra-pnotify'},
      {type: 'link', label: 'jGrowl and Noty notifications', to: '/extra-jgrowl-noty'},
      {type: 'link', label: 'SweetAlert notifications', to: '/extra-sweetalert'},
      {type: 'divider'},
      {type: 'link', label: 'NoUI sliders', to: '/extra-sliders-noui'},
      {type: 'link', label: 'Ion range sliders', to: '/extra-sliders-ion'},
      {type: 'link', label: 'Dynamic tree views', to: '/extra-trees'},
      {type: 'link', label: 'Context menu', to: '/extra-context-menu'},
      {type: 'link', label: 'Floating action buttons', to: '/extra-fab'},
      {type: 'link', label: 'Session timeout', to: '/extra-session-timeout'},
      {type: 'link', label: 'Idle timeout', to: '/extra-idle-timeout'},
    ],
  },
  {
    type: 'group', label: "Color system", icon: "droplet2",
    children: [
      {type: 'link', label: 'Primary palette', to: '/colors-primary'},
      {type: 'link', label: 'Danger palette', to: '/colors-danger'},
      {type: 'link', label: 'Success palette', to: '/colors-success'},
      {type: 'link', label: 'Warning palette', to: '/colors-warning'},
      {type: 'link', label: 'Info palette', to: '/colors-info'},
      {type: 'divider'},
      {type: 'link', label: 'Pink palette', to: '/colors-pink'},
      {type: 'link', label: 'Violet palette', to: '/colors-violet'},
      {type: 'link', label: 'Purple palette', to: '/colors-purple'},
      {type: 'link', label: 'Indigo palette', to: '/colors-indigo'},
      {type: 'link', label: 'Blue palette', to: '/colors-blue'},
      {type: 'link', label: 'Teal palette', to: '/colors-teal'},
      {type: 'link', label: 'Green palette', to: '/colors-green'},
      {type: 'link', label: 'Orange palette', to: '/colors-orange'},
      {type: 'link', label: 'Brown palette', to: '/colors-brown'},
      {type: 'link', label: 'Grey palette', to: '/colors-grey'},
      {type: 'link', label: 'Slate palette', to: '/colors-slate'},
    ],
  },
  {
    type: 'group', label: "Animations", icon: "spinner2",
    children: [
      {type: 'link', label: 'CSS3 animations', to: '/animations-css3'},
      {
        type: 'group', label: "Velocity animations",
        children: [
          {type: 'link', label: 'Basic usage', to: '/animations-velocity-basic'},
          {type: 'link', label: 'UI pack effects', to: '/animations-velocity-ui'},
          {type: 'link', label: 'Advanced examples', to: '/animations-velocity-examples'},
        ],
      },
    ],
  },
  {
    type: 'group', label: "Icons", icon: "thumbs-up2",
    children: [
      {type: 'link', label: 'Icomoon', to: '/icons-icomoon'},
      {type: 'link', label: 'Material', to: '/icons-material'},
      {type: 'link', label: 'Font awesome', to: '/icons-fontawesome'},
    ],
  },
  {type: 'header', title: 'Layout'},
  {
    type: 'group', label: "Page layouts", icon: "stack2",
    children: [
      {type: 'link', label: 'Fixed navbar', to: '/layout-fixed-navbar'},
      {type: 'link', label: 'Fixed sidebar - custom scroll', to: '/layout-fixed-sidebar-custom'},
      {type: 'link', label: 'Fixed sidebar - native scroll', to: '/layout-fixed-sidebar-native'},
      {type: 'link', label: 'Hideable navbar', to: '/layout-fixed-hideable-navbar'},
      {type: 'link', label: 'Fixed footer', to: '/layout-fixed-footer'},
      {type: 'divider'},
      {type: 'link', label: 'Boxed with default sidebar', to: '/layout-boxed-default'},
      {type: 'link', label: 'Boxed with mini sidebar', to: '/layout-boxed-mini'},
      {type: 'link', label: 'Boxed full width', to: '/layout-boxed-full'},
      {type: 'link', label: 'Boxed content', to: '/layout-boxed-content'},
    ],
  },
  {
    type: 'group', label: "Sidebars", icon: "indent-decrease2",
    children: [
      {
        type: 'group', label: "Main sidebar",
        children: [
          {type: 'link', label: 'Default collapsible', to: '/sidebar-default-collapse'},
          {type: 'link', label: 'Default hideable', to: '/sidebar-default-hide'},
          {type: 'link', label: 'Default hidden', to: '/sidebar-default-hidden'},
          {type: 'link', label: 'Mini collapsible', to: '/sidebar-mini-collapse'},
          {type: 'link', label: 'Mini hideable', to: '/sidebar-mini-hide'},
          {type: 'link', label: 'Mini hidden', to: '/sidebar-mini-hidden'},
          {type: 'divider'},
          {type: 'link', label: 'Light color', to: '/sidebar-default-color-light'},
          {type: 'link', label: 'Custom color', to: '/sidebar-default-color-custom'},
        ],
      },
      {
        type: 'group', label: "Secondary sidebar",
        children: [
          {type: 'link', label: 'After default', to: '/sidebar-secondary-after'},
          {type: 'link', label: 'Before default', to: '/sidebar-secondary-before'},
          {type: 'link', label: 'Hidden by default', to: '/sidebar-secondary-hidden'},
          {type: 'divider'},
          {type: 'link', label: 'Dark color', to: '/sidebar-secondary-color-dark'},
          {type: 'link', label: 'Custom color', to: '/sidebar-secondary-color-custom'},
        ],
      },
      {
        type: 'group', label: "Right sidebar",
        children: [
          {type: 'link', label: 'Show - collapse main', to: '/sidebar-right-default-collapse'},
          {type: 'link', label: 'Show - hide main', to: '/sidebar-right-default-hide'},
          {type: 'link', label: 'Show - fix default width', to: '/sidebar-right-default-toggle'},
          {type: 'link', label: 'Show - fix mini width', to: '/sidebar-right-mini-toggle'},
          {type: 'link', label: 'Show - hide secondary', to: '/sidebar-right-secondary-hide'},
          {type: 'link', label: 'Visible by default', to: '/sidebar-right-visible'},
          {type: 'divider'},
          {type: 'link', label: 'Dark color', to: '/sidebar-right-color-dark'},
          {type: 'link', label: 'Custom color', to: '/sidebar-right-color-custom'},
        ],
      },
      {
        type: 'group', label: "Content sidebar",
        children: [
          {type: 'link', label: 'Left position', to: '/sidebar-content-left'},
          {type: 'link', label: 'Left stretched', to: '/sidebar-content-left-stretch'},
          {type: 'link', label: 'Left hidden', to: '/sidebar-content-left-hidden'},
          {type: 'link', label: 'Right position', to: '/sidebar-content-right'},
          {type: 'link', label: 'Right stretched', to: '/sidebar-content-right-stretch'},
          {type: 'link', label: 'Right hidden', to: '/sidebar-content-right-hidden'},
          {type: 'link', label: 'Sectioned sidebar', to: '/sidebar-content-sections'},
          {type: 'divider'},
          {type: 'link', label: 'Dark color', to: '/sidebar-content-color-dark'},
          {type: 'link', label: 'Custom color', to: '/sidebar-content-color-custom'},
          {type: 'link', label: 'Custom sections color', to: '/sidebar-content-color-sections-custom'},
        ],
      },
      {type: 'divider'},
      {type: 'link', label: 'Sidebar components', to: '/sidebar-components'},
    ],
  },
  {
    type: 'group', label: "Navbars", icon: "menu3",
    children: [
      {
        type: 'group', label: "Single navbar",
        children: [
          {type: 'link', label: 'Single top static', to: '/navbar-single-top-static'},
          {type: 'link', label: 'Single top fixed', to: '/navbar-single-top-fixed'},
          {type: 'link', label: 'Single bottom static', to: '/navbar-single-bottom-static'},
          {type: 'link', label: 'Single bottom fixed', to: '/navbar-single-bottom-fixed'},
          {type: 'link', label: 'Before page header', to: '/navbar-single-header-before'},
          {type: 'link', label: 'After page header', to: '/navbar-single-header-after'},
          {type: 'link', label: 'After page content', to: '/navbar-single-content-after'},
        ],
      },
      {
        type: 'group', label: "Multiple navbars",
        children: [
          {type: 'link', label: 'Multiple top static', to: '/navbar-multiple-top-static'},
          {type: 'link', label: 'Multiple top fixed', to: '/navbar-multiple-top-fixed'},
          {type: 'link', label: 'Multiple bottom static', to: '/navbar-multiple-bottom-static'},
          {type: 'link', label: 'Multiple bottom fixed', to: '/navbar-multiple-bottom-fixed'},
          {type: 'link', label: 'Multiple - top and bottom', to: '/navbar-multiple-top-bottom'},
          {type: 'link', label: 'Multiple - secondary sticky', to: '/navbar-multiple-secondary-sticky'},
        ],
      },
      {
        type: 'group', label: "Content navbar",
        children: [
          {type: 'link', label: 'Single navbar', to: '/navbar-component-single'},
          {type: 'link', label: 'Multiple navbars', to: '/navbar-component-multiple'},
        ],
      },
      {type: 'divider'},
      {type: 'link', label: 'Color options', to: '/navbar-colors'},
      {type: 'link', label: 'Sizing options', to: '/navbar-sizes'},
      {type: 'link', label: 'Hide on scroll', to: '/navbar-hideable'},
      {type: 'link', label: 'Navbar components', to: '/navbar-components'},
    ],
  },
  {
    type: 'group', label: "Vertical navigation", icon: "sort",
    children: [
      {type: 'link', label: 'Collapsible menu', to: '/navigation-vertical-collapsible'},
      {type: 'link', label: 'Accordion menu', to: '/navigation-vertical-accordion'},
      {type: 'link', label: 'Bordered navigation', to: '/navigation-vertical-bordered'},
      {type: 'link', label: 'Right icons', to: '/navigation-vertical-right-icons'},
      {type: 'link', label: 'Badges', to: '/navigation-vertical-badges'},
      {type: 'link', label: 'Disabled items', to: '/navigation-vertical-disabled'},
    ],
  },
  {
    type: 'group', label: "Horizontal navigation", icon: "transmission",
    children: [
      {type: 'link', label: 'Submenu on click', to: '/navigation-horizontal-click'},
      {type: 'link', label: 'Submenu on hover', to: '/navigation-horizontal-hover'},
      {type: 'link', label: 'With custom elements', to: '/navigation-horizontal-elements'},
      {type: 'link', label: 'Tabbed navigation', to: '/navigation-horizontal-tabs'},
      {type: 'link', label: 'Disabled navigation links', to: '/navigation-horizontal-disabled'},
      {type: 'link', label: 'Horizontal mega menu', to: '/navigation-horizontal-mega'},
    ],
  },
  {
    type: 'group', label: "Menu levels", icon: "tree5",
    children: [
      {type: 'link', label: 'Second level', to: '#', icon: 'IE'},
      {
        type: 'group', label: "Second level with child", icon: "firefox",
        children: [
          {type: 'link', label: 'Third level', to: '#', icon: 'android'},
          {
            type: 'group', label: "Third level with child", icon: "apple2",
            children: [
              {type: 'link', label: 'Fourth level', to: '#', icon: 'html5'},
              {type: 'link', label: 'Fourth level', to: '#', icon: 'css3'},
            ],
          },
          {type: 'link', label: 'Third level', to: '#', icon: 'windows'},
        ],
      },
      {type: 'link', label: 'Second level', to: '#', icon: 'chrome'},
    ],
  },
  {type: 'header', title: 'Data visualization'},
  {
    type: 'group', label: "Echarts library", icon: "graph",
    children: [
      {type: 'link', label: 'Line charts', to: '/echarts-lines'},
      {type: 'link', label: 'Area charts', to: '/echarts-areas'},
      {type: 'link', label: 'Columns and waterfalls', to: '/echarts-columns-waterfalls'},
      {type: 'link', label: 'Bars and tornados', to: '/echarts-bars-tornados'},
      {type: 'link', label: 'Scatter charts', to: '/echarts-scatter'},
      {type: 'link', label: 'Pies and donuts', to: '/echarts-pies-donuts'},
      {type: 'link', label: 'Funnels and calendars', to: '/echarts-funnels-calendars'},
      {type: 'link', label: 'Candlesticks and others', to: '/echarts-candlesticks-others'},
    ],
  },
  {
    type: 'group', label: "D3 library", icon: "statistics",
    children: [
      {type: 'link', label: 'Simple lines', to: '/d3-lines-basic'},
      {type: 'link', label: 'Advanced lines', to: '/d3-lines-advanced'},
      {type: 'link', label: 'Simple bars', to: '/d3-bars-basic'},
      {type: 'link', label: 'Advanced bars', to: '/d3-bars-advanced'},
      {type: 'link', label: 'Pie charts', to: '/d3-pies'},
      {type: 'link', label: 'Circle diagrams', to: '/d3-circle-diagrams'},
      {type: 'link', label: 'Tree layout', to: '/d3-tree'},
      {type: 'link', label: 'Other charts', to: '/d3-other'},
    ],
  },
  {
    type: 'group', label: "C3 library", icon: "stats-bars",
    children: [
      {type: 'link', label: 'Lines and areas', to: '/c3-lines-areas'},
      {type: 'link', label: 'Bars and pies', to: '/c3-bars-pies'},
      {type: 'link', label: 'Advanced examples', to: '/c3-advanced'},
      {type: 'link', label: 'Chart axis', to: '/c3-axis'},
      {type: 'link', label: 'Grid options', to: '/c3-grid'},
    ],
  },
  {
    type: 'group', label: "Google charts", icon: "google",
    children: [
      {type: 'link', label: 'Line charts', to: '/google-lines'},
      {type: 'link', label: 'Bar charts', to: '/google-bars'},
      {type: 'link', label: 'Pie charts', to: '/google-pies'},
      {type: 'link', label: 'Bubble & scatter charts', to: '/google-scatter-bubble'},
      {type: 'link', label: 'Other charts', to: '/google-other'},
    ],
  },
  {
    type: 'group', label: "Maps integration", icon: "map5",
    children: [
      {
        type: 'group', label: "Google maps",
        children: [
          {type: 'link', label: 'Basics', to: '/maps-google-basic'},
          {type: 'link', label: 'Controls', to: '/maps-google-controls'},
          {type: 'link', label: 'Markers', to: '/maps-google-markers'},
          {type: 'link', label: 'Map drawings', to: '/maps-google-drawings'},
          {type: 'link', label: 'Layers', to: '/maps-google-layers'},
        ],
      },
      {type: 'link', label: 'Vector maps', to: '/maps-vector'},
      {type: 'link', label: 'ECharts maps', to: '/maps-echarts', badge: {text: 'Coming soon'}, disabled: true},
    ],
  },
  {type: 'header', title: 'Extensions'},
  {
    type: 'group', label: "Extensions", icon: "puzzle4",
    children: [
      {type: 'link', label: 'Image cropper', to: '/extension-image-cropper'},
      {type: 'link', label: 'Block UI', to: '/extension-blockui'},
      {type: 'link', label: 'Drag and drop', to: '/extension-dnd'},
    ],
  },
  {
    type: 'group', label: "JQuery UI", icon: "popout",
    children: [
      {type: 'link', label: 'Interactions', to: '/jqueryui-interactions'},
      {type: 'link', label: 'Forms', to: '/jqueryui-forms'},
      {type: 'link', label: 'Components', to: '/jqueryui-components'},
      {type: 'link', label: 'Sliders', to: '/jqueryui-sliders'},
      {type: 'link', label: 'Navigation', to: '/jqueryui-navigation'},
    ],
  },
  {
    type: 'group', label: "File uploaders", icon: "upload",
    children: [
      {type: 'link', label: 'Plupload', to: '/uploader-plupload'},
      {type: 'link', label: 'Bootstrap file uploader', to: '/uploader-bootstrap'},
      {type: 'link', label: 'Dropzone', to: '/uploader-dropzone'},
    ],
  },
  {
    type: 'group', label: "Event calendars", icon: "calendar3",
    children: [
      {type: 'link', label: 'Basic views', to: '/fullcalendar-views'},
      {type: 'link', label: 'Event styling', to: '/fullcalendar-styling'},
      {type: 'link', label: 'Language and time', to: '/fullcalendar-formats'},
      {type: 'link', label: 'Advanced usage', to: '/fullcalendar-advanced'},
    ],
  },
  {
    type: 'group', label: "Internationalization", icon: "sphere",
    children: [
      {type: 'link', label: 'Direct translation', to: '/internationalization-switch-direct'},
      {type: 'link', label: 'Querystring parameter', to: '/internationalization-switch-query'},
      {type: 'link', label: 'Language fallback', to: '/internationalization-fallback'},
      {type: 'link', label: 'Callbacks', to: '/internationalization-callbacks'},
    ],
  },
  {type: 'header', title: 'Tables'},
  {
    type: 'group', label: "Basic tables", icon: "table2",
    children: [
      {type: 'link', label: 'Basic examples', to: '/table-basic'},
      {type: 'link', label: 'Table sizing', to: '/table-sizing'},
      {type: 'link', label: 'Table borders', to: '/table-borders'},
      {type: 'link', label: 'Table styling', to: '/table-styling'},
      {type: 'link', label: 'Table elements', to: '/table-elements'},
    ],
  },
  {
    type: 'group', label: "Data tables", icon: "grid7",
    children: [
      {type: 'link', label: 'Basic initialization', to: '/datatable-basic'},
      {type: 'link', label: 'Basic styling', to: '/datatable-styling'},
      {type: 'link', label: 'Advanced examples', to: '/datatable-advanced'},
      {type: 'link', label: 'Sorting options', to: '/datatable-sorting'},
      {type: 'link', label: 'Using API', to: '/datatable-api'},
      {type: 'link', label: 'Data sources', to: '/datatable-data-sources'},
    ],
  },
  {
    type: 'group', label: "Data tables extensions", icon: "alignment-unalign",
    children: [
      {type: 'link', label: 'Columns reorder', to: '/datatable-extension-reorder'},
      {type: 'link', label: 'Row reorder', to: '/datatable-extension-row-reorder'},
      {type: 'link', label: 'Fixed columns', to: '/datatable-extension-fixed-columns'},
      {type: 'link', label: 'Fixed header', to: '/datatable-extension-fixed-header'},
      {type: 'link', label: 'Auto fill', to: '/datatable-extension-autofill'},
      {type: 'link', label: 'Key table', to: '/datatable-extension-key-table'},
      {type: 'link', label: 'Scroller', to: '/datatable-extension-scroller'},
      {type: 'link', label: 'Select', to: '/datatable-extension-select'},
      {
        type: 'group', label: "Buttons",
        children: [
          {type: 'link', label: 'Initialization', to: '/datatable-extension-buttons-init'},
          {type: 'link', label: 'Flash buttons', to: '/datatable-extension-buttons-flash'},
          {type: 'link', label: 'Print buttons', to: '/datatable-extension-buttons-print'},
          {type: 'link', label: 'HTML5 buttons', to: '/datatable-extension-buttons-html5'},
        ],
      },
      {type: 'link', label: 'Columns visibility', to: '/datatable-extension-colvis'},
    ],
  },
  {
    type: 'group', label: "Responsive tables", icon: "versions",
    children: [
      {type: 'link', label: 'Responsive basic tables', to: '/table-responsive'},
      {type: 'link', label: 'Responsive data tables', to: '/datatable-responsive'},
    ],
  },
  {type: 'header', title: 'Page kits'},
  {
    type: 'group', label: "General pages", icon: "grid6",
    children: [
      {type: 'link', label: 'Feed', to: '/general-feed'},
      {type: 'link', label: 'Embeds', to: '/general-embeds'},
      {type: 'link', label: 'FAQ page', to: '/general-faq'},
      {type: 'link', label: 'Knowledgebase', to: '/general-knowledgebase'},
      {
        type: 'group', label: "Blog",
        children: [
          {type: 'link', label: 'Classic vertical', to: '/blog-classic-v'},
          {type: 'link', label: 'Classic horizontal', to: '/blog-classic-h'},
          {type: 'link', label: 'Grid', to: '/blog-grid'},
          {type: 'link', label: 'Single post', to: '/blog-single'},
          {type: 'divider'},
          {type: 'link', label: 'Left sidebar', to: '/blog-sidebar-left'},
          {type: 'link', label: 'Right sidebar', to: '/blog-sidebar-right'},
        ],
      },
      {
        type: 'group', label: "Timelines",
        children: [
          {type: 'link', label: 'Left timeline', to: '/timelines-left'},
          {type: 'link', label: 'Right timeline', to: '/timelines-right'},
          {type: 'link', label: 'Centered timeline', to: '/timelines-center'},
        ],
      },
      {
        type: 'group', label: "Gallery",
        children: [
          {type: 'link', label: 'Media grid', to: '/gallery-grid'},
          {type: 'link', label: 'Media with titles', to: '/gallery-titles'},
          {type: 'link', label: 'Media with description', to: '/gallery-description'},
          {type: 'link', label: 'Media library', to: '/gallery-library'},
        ],
      },
    ],
  },
  {
    type: 'group', label: "Service pages", icon: "wrench3",
    children: [
      {type: 'link', label: 'Sitemap', to: '/service-sitemap'},
      {
        type: 'group', label: "Invoicing",
        children: [
          {type: 'link', label: 'Invoice template', to: '/invoice-template'},
          {type: 'link', label: 'Invoice grid', to: '/invoice-grid'},
          {type: 'link', label: 'Invoice archive', to: '/invoice-archive'},
        ],
      },
      {
        type: 'group', label: "Authentication",
        children: [
          {type: 'link', label: 'Simple login', to: '/login-simple'},
          {type: 'link', label: 'More login info', to: '/login-advanced'},
          {type: 'link', label: 'Simple registration', to: '/login-registration'},
          {type: 'link', label: 'More registration info', to: '/login-registration-advanced'},
          {type: 'link', label: 'Unlock user', to: '/login-unlock'},
          {type: 'link', label: 'Reset password', to: '/login-password-recover'},
          {type: 'link', label: 'Hide navbar', to: '/login-hide-navbar'},
          {type: 'link', label: 'Transparent box', to: '/login-transparent'},
          {type: 'link', label: 'Background option', to: '/login-background'},
          {type: 'link', label: 'With validation', to: '/login-validation'},
          {type: 'link', label: 'Tabbed form', to: '/login-tabbed'},
          {type: 'link', label: 'Inside modals', to: '/login-modals'},
        ],
      },
      {
        type: 'group', label: "Error pages",
        children: [
          {type: 'link', label: 'Error 403', to: '/error-403'},
          {type: 'link', label: 'Error 404', to: '/error-404'},
          {type: 'link', label: 'Error 405', to: '/error-405'},
          {type: 'link', label: 'Error 500', to: '/error-500'},
          {type: 'link', label: 'Error 503', to: '/error-503'},
          {type: 'link', label: 'Offline page', to: '/error-offline'},
        ],
      },
    ],
  },
  {
    type: 'group', label: "User pages", icon: "people",
    children: [
      {type: 'link', label: 'User list', to: '/user-pages-list'},
      {type: 'link', label: 'User cards', to: '/user-pages-cards'},
      {type: 'link', label: 'Simple profile', to: '/user-pages-profile'},
      {type: 'link', label: 'Tabbed profile', to: '/user-pages-profile-tabbed'},
      {type: 'link', label: 'Profile with cover', to: '/user-pages-profile-cover'},
    ],
  },
  {
    type: 'group', label: "Application pages", icon: "cube3",
    children: [
      {
        type: 'group', label: "Task manager",
        children: [
          {type: 'link', label: 'Task grid', to: '/task-manager-grid'},
          {type: 'link', label: 'Task list', to: '/task-manager-list'},
          {type: 'link', label: 'Task detailed', to: '/task-manager-detailed'},
        ],
      },
      {
        type: 'group', label: "Inbox",
        children: [
          {type: 'link', label: 'Mail list', to: '/mail-list'},
          {type: 'link', label: 'Mail list (detached)', to: '/mail-list-detached'},
          {type: 'link', label: 'Read mail', to: '/mail-read'},
          {type: 'link', label: 'Write mail', to: '/mail-write'},
          {type: 'divider'},
          {type: 'link', label: 'Chat layouts', to: '/chat-layouts'},
          {type: 'link', label: 'Chat options', to: '/chat-options'},
        ],
      },
      {
        type: 'group', label: "Search",
        children: [
          {type: 'link', label: 'Basic search results', to: '/search-basic'},
          {type: 'link', label: 'User search results', to: '/search-users'},
          {type: 'link', label: 'Image search results', to: '/search-images'},
          {type: 'link', label: 'Video search results', to: '/search-videos'},
        ],
      },
      {
        type: 'group', label: "Job search",
        children: [
          {type: 'link', label: 'Cards view', to: '/job-list-cards'},
          {type: 'link', label: 'List view', to: '/job-list-list'},
          {type: 'link', label: 'Job detailed', to: '/job-detailed'},
          {type: 'link', label: 'Apply', to: '/job-apply'},
        ],
      },
      {
        type: 'group', label: "Learning",
        children: [
          {type: 'link', label: 'List view', to: '/learning-list'},
          {type: 'link', label: 'Grid view', to: '/learning-grid'},
          {type: 'link', label: 'Detailed course', to: '/learning-detailed'},
        ],
      },
      {
        type: 'group', label: "Ecommerce set",
        children: [
          {type: 'link', label: 'Product list', to: '/ecommerce-product-list'},
          {type: 'link', label: 'Product grid', to: '/ecommerce-product-grid'},
          {type: 'link', label: 'Orders history', to: '/ecommerce-orders-history'},
          {type: 'link', label: 'Customers', to: '/ecommerce-customers'},
          {type: 'link', label: 'Pricing tables', to: '/ecommerce-pricing'},
        ],
      },
    ],
  },
  {
    type: 'group', label: "Widgets", icon: "atom2",
    children: [
      {type: 'link', label: 'Content widgets', to: '/widgets-content'},
      {type: 'link', label: 'Statistics widgets', to: '/widgets-stats'},
      {type: 'link', label: 'Menu widgets', to: '/widgets-menu', badge: {text: 'Coming soon'}, disabled: true},
      {type: 'link', label: 'Form widgets', to: '/widgets-form', badge: {text: 'Coming soon'}, disabled: true},
    ],
  },
]

/**
 * Thêm BASE_PATH cho toàn bộ link, bao gồm cả group lồng nhau.
 * Giữ nguyên link đã có prefix, link '#', header và divider.
 */
const addBasePath = (nodes: NavNode[]): NavNode[] =>
  nodes.map((node) => {
    if (node.type === 'link') {
      return {
        ...node,
        to: withBasePath(node.to),
      }
    }

    if (node.type === 'group') {
      return {
        ...node,
        children: addBasePath(node.children),
      }
    }

    return node
  })

export const demoNavigation: NavNode[] = addBasePath(navigationItems)
