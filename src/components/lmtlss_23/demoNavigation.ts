// Sinh tự động từ sidebar của template Limitless (index.html): 345 link demo.
// Dự án thật: copy file này thành navigation.ts, giữ lại mục cần dùng và truyền vào <LimitlessLayout navigation={...}>.
import type { NavNode } from './navTypes'

// Trang dashboard demo đang chạy ở /lmtlss_23/ nên mục "trang chủ" phải trỏ đúng đường dẫn này
// (NavLink dùng `end`, nếu để '/' thì Dashboard sẽ không được tô active).
const HOME = '/lmtlss_23/'

export const demoNavigation: NavNode[] = [
  {type: 'header', title: 'Main'},
  {type: 'link', label: 'Dashboard', to: HOME, icon: 'home4'},
  {
    type: 'group', label: "Layouts", icon: "copy",
    children: [
      {type: 'link', label: 'Default layout', to: HOME},
      {type: 'link', label: 'Layout 2', to: '/layout_2-LTR-default-full'},
      {type: 'link', label: 'Layout 3', to: '/layout_3-LTR-default-full'},
      {type: 'link', label: 'Layout 4', to: '/layout_4-LTR-default-full'},
      {type: 'link', label: 'Layout 5', to: '/layout_5-LTR-default-full'},
      {type: 'link', label: 'Layout 6', to: '/layout_6-LTR-default-full', badge: {text: 'Coming soon'}, disabled: true},
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
      {type: 'link', label: 'Horizontal navigation', to: '/layout_nav_horizontal'},
      {type: 'link', label: 'No sidebar', to: '/sidebar_none'},
      {type: 'link', label: '1 sidebar', to: '/sidebar_main'},
      {
        type: 'group', label: "2 sidebars",
        children: [
          {type: 'link', label: 'Secondary sidebar', to: '/sidebar_secondary'},
          {type: 'link', label: 'Right sidebar', to: '/sidebar_right'},
        ],
      },
      {
        type: 'group', label: "3 sidebars",
        children: [
          {type: 'link', label: 'Right sidebar hidden', to: '/sidebar_right_hidden'},
          {type: 'link', label: 'Right sidebar visible', to: '/sidebar_right_visible'},
        ],
      },
      {
        type: 'group', label: "Content sidebars",
        children: [
          {type: 'link', label: 'Left sidebar', to: '/sidebar_content_left'},
          {type: 'link', label: 'Right sidebar', to: '/sidebar_content_right'},
        ],
      },
      {type: 'link', label: 'Boxed layout', to: '/layout_boxed'},
      {type: 'divider'},
      {type: 'link', label: 'Fixed main navbar', to: '/navbar_fixed_main'},
      {type: 'link', label: 'Fixed secondary navbar', to: '/navbar_fixed_secondary'},
      {type: 'link', label: 'Both navbars fixed', to: '/navbar_fixed_both'},
      {type: 'link', label: 'Fixed layout', to: '/layout_fixed'},
    ],
  },
  {type: 'link', label: 'Changelog', to: '/changelog', icon: 'list-unordered', badge: {text: '2.3', color: 'blue-400'}},
  {type: 'link', label: 'RTL version', to: '/RTL-default-full', icon: 'width'},
  {type: 'header', title: 'Forms'},
  {
    type: 'group', label: "Form components", icon: "pencil3",
    children: [
      {type: 'link', label: 'Basic inputs', to: '/form_inputs'},
      {type: 'link', label: 'Checkboxes & radios', to: '/form_checkboxes_radios'},
      {type: 'link', label: 'Select2 selects', to: '/form_select2'},
      {type: 'link', label: 'Bootstrap multiselect', to: '/form_multiselect'},
      {type: 'link', label: 'Input groups', to: '/form_input_groups'},
      {type: 'link', label: 'Extended controls', to: '/form_controls_extended'},
      {type: 'link', label: 'Floating labels', to: '/form_floating_labels'},
      {type: 'link', label: 'Tag inputs', to: '/form_tag_inputs'},
      {type: 'link', label: 'Dual Listboxes', to: '/form_dual_listboxes'},
      {type: 'link', label: 'Validation', to: '/form_validation'},
      {type: 'link', label: 'Form wizard', to: '/form_wizard'},
      {type: 'link', label: 'Form actions', to: '/form_actions'},
      {type: 'link', label: 'Inputs grid', to: '/form_inputs_grid'},
    ],
  },
  {
    type: 'group', label: "JSON forms", icon: "file-css",
    children: [
      {type: 'link', label: 'Basic inputs', to: '/alpaca_basic'},
      {type: 'link', label: 'Advanced inputs', to: '/alpaca_advanced'},
      {type: 'link', label: 'Controls', to: '/alpaca_controls'},
    ],
  },
  {
    type: 'group', label: "Text editors", icon: "spell-check",
    children: [
      {type: 'link', label: 'Summernote editor', to: '/editor_summernote'},
      {type: 'link', label: 'CKEditor', to: '/editor_ckeditor'},
      {type: 'link', label: 'Trumbowyg editor', to: '/editor_trumbowyg'},
      {type: 'link', label: 'Code editor', to: '/editor_code'},
    ],
  },
  {
    type: 'group', label: "Pickers", icon: "select2",
    children: [
      {type: 'link', label: 'Date & time pickers', to: '/picker_date'},
      {type: 'link', label: 'Color pickers', to: '/picker_color'},
      {type: 'link', label: 'Location pickers', to: '/picker_location'},
    ],
  },
  {
    type: 'group', label: "Form layouts", icon: "insert-template",
    children: [
      {type: 'link', label: 'Vertical form', to: '/form_layout_vertical'},
      {type: 'link', label: 'Custom styles', to: '/form_layout_vertical_styled', badge: {text: 'Coming soon'}, disabled: true},
      {type: 'divider'},
      {type: 'link', label: 'Horizontal form', to: '/form_layout_horizontal'},
      {type: 'link', label: 'Custom styles', to: '/form_layout_horizontal_styled', badge: {text: 'Coming soon'}, disabled: true},
    ],
  },
  {type: 'header', title: 'Components'},
  {
    type: 'group', label: "Basic components", icon: "grid",
    children: [
      {type: 'link', label: 'Modals', to: '/components_modals'},
      {type: 'link', label: 'Dropdown menus', to: '/components_dropdowns'},
      {type: 'link', label: 'Tabs component', to: '/components_tabs'},
      {type: 'link', label: 'Pills component', to: '/components_pills'},
      {type: 'link', label: 'Collapsible', to: '/components_collapsible'},
      {type: 'link', label: 'Navs', to: '/components_navs'},
      {type: 'link', label: 'Buttons', to: '/components_buttons'},
      {type: 'link', label: 'Tooltips and popovers', to: '/components_popups'},
      {type: 'link', label: 'Alerts', to: '/components_alerts'},
      {type: 'link', label: 'Pagination', to: '/components_pagination'},
      {type: 'link', label: 'Badges', to: '/components_badges'},
      {type: 'link', label: 'Progress', to: '/components_progress'},
      {type: 'link', label: 'Breadcrumbs', to: '/components_breadcrumbs'},
      {type: 'link', label: 'Media objects', to: '/components_media'},
      {type: 'link', label: 'Scrollspy', to: '/components_scrollspy'},
    ],
  },
  {
    type: 'group', label: "Content styling", icon: "puzzle2",
    children: [
      {type: 'link', label: 'Page header', to: '/content_page_header'},
      {type: 'link', label: 'Page footer', to: '/content_page_footer', badge: {text: 'Coming soon'}, disabled: true},
      {type: 'divider'},
      {type: 'link', label: 'Cards', to: '/content_cards'},
      {type: 'link', label: 'Card content', to: '/content_cards_content'},
      {type: 'link', label: 'Card layouts', to: '/content_cards_layouts'},
      {type: 'link', label: 'Card header elements', to: '/content_cards_header'},
      {type: 'link', label: 'Card footer elements', to: '/content_cards_footer'},
      {type: 'link', label: 'Draggable cards', to: '/content_cards_draggable'},
      {type: 'divider'},
      {type: 'link', label: 'Text styling', to: '/content_text_styling'},
      {type: 'link', label: 'Typography', to: '/content_typography'},
      {type: 'link', label: 'Helper classes', to: '/content_helpers'},
      {type: 'link', label: 'Flex utilities', to: '/content_helpers_flex'},
      {type: 'link', label: 'Syntax highlighter', to: '/content_syntax_highlighter'},
      {type: 'link', label: 'Grid system', to: '/content_grid'},
    ],
  },
  {
    type: 'group', label: "Extra components", icon: "gift",
    children: [
      {type: 'link', label: 'PNotify notifications', to: '/extra_pnotify'},
      {type: 'link', label: 'jGrowl and Noty notifications', to: '/extra_jgrowl_noty'},
      {type: 'link', label: 'SweetAlert notifications', to: '/extra_sweetalert'},
      {type: 'divider'},
      {type: 'link', label: 'NoUI sliders', to: '/extra_sliders_noui'},
      {type: 'link', label: 'Ion range sliders', to: '/extra_sliders_ion'},
      {type: 'link', label: 'Dynamic tree views', to: '/extra_trees'},
      {type: 'link', label: 'Context menu', to: '/extra_context_menu'},
      {type: 'link', label: 'Floating action buttons', to: '/extra_fab'},
      {type: 'link', label: 'Session timeout', to: '/extra_session_timeout'},
      {type: 'link', label: 'Idle timeout', to: '/extra_idle_timeout'},
    ],
  },
  {
    type: 'group', label: "Color system", icon: "droplet2",
    children: [
      {type: 'link', label: 'Primary palette', to: '/colors_primary'},
      {type: 'link', label: 'Danger palette', to: '/colors_danger'},
      {type: 'link', label: 'Success palette', to: '/colors_success'},
      {type: 'link', label: 'Warning palette', to: '/colors_warning'},
      {type: 'link', label: 'Info palette', to: '/colors_info'},
      {type: 'divider'},
      {type: 'link', label: 'Pink palette', to: '/colors_pink'},
      {type: 'link', label: 'Violet palette', to: '/colors_violet'},
      {type: 'link', label: 'Purple palette', to: '/colors_purple'},
      {type: 'link', label: 'Indigo palette', to: '/colors_indigo'},
      {type: 'link', label: 'Blue palette', to: '/colors_blue'},
      {type: 'link', label: 'Teal palette', to: '/colors_teal'},
      {type: 'link', label: 'Green palette', to: '/colors_green'},
      {type: 'link', label: 'Orange palette', to: '/colors_orange'},
      {type: 'link', label: 'Brown palette', to: '/colors_brown'},
      {type: 'link', label: 'Grey palette', to: '/colors_grey'},
      {type: 'link', label: 'Slate palette', to: '/colors_slate'},
    ],
  },
  {
    type: 'group', label: "Animations", icon: "spinner2",
    children: [
      {type: 'link', label: 'CSS3 animations', to: '/animations_css3'},
      {
        type: 'group', label: "Velocity animations",
        children: [
          {type: 'link', label: 'Basic usage', to: '/animations_velocity_basic'},
          {type: 'link', label: 'UI pack effects', to: '/animations_velocity_ui'},
          {type: 'link', label: 'Advanced examples', to: '/animations_velocity_examples'},
        ],
      },
    ],
  },
  {
    type: 'group', label: "Icons", icon: "thumbs-up2",
    children: [
      {type: 'link', label: 'Icomoon', to: '/icons_icomoon'},
      {type: 'link', label: 'Material', to: '/icons_material'},
      {type: 'link', label: 'Font awesome', to: '/icons_fontawesome'},
    ],
  },
  {type: 'header', title: 'Layout'},
  {
    type: 'group', label: "Page layouts", icon: "stack2",
    children: [
      {type: 'link', label: 'Fixed navbar', to: '/layout_fixed_navbar'},
      {type: 'link', label: 'Fixed sidebar - custom scroll', to: '/layout_fixed_sidebar_custom'},
      {type: 'link', label: 'Fixed sidebar - native scroll', to: '/layout_fixed_sidebar_native'},
      {type: 'link', label: 'Hideable navbar', to: '/layout_fixed_hideable_navbar'},
      {type: 'link', label: 'Fixed footer', to: '/layout_fixed_footer'},
      {type: 'divider'},
      {type: 'link', label: 'Boxed with default sidebar', to: '/layout_boxed_default'},
      {type: 'link', label: 'Boxed with mini sidebar', to: '/layout_boxed_mini'},
      {type: 'link', label: 'Boxed full width', to: '/layout_boxed_full'},
      {type: 'link', label: 'Boxed content', to: '/layout_boxed_content'},
    ],
  },
  {
    type: 'group', label: "Sidebars", icon: "indent-decrease2",
    children: [
      {
        type: 'group', label: "Main sidebar",
        children: [
          {type: 'link', label: 'Default collapsible', to: '/sidebar_default_collapse'},
          {type: 'link', label: 'Default hideable', to: '/sidebar_default_hide'},
          {type: 'link', label: 'Default hidden', to: '/sidebar_default_hidden'},
          {type: 'link', label: 'Mini collapsible', to: '/sidebar_mini_collapse'},
          {type: 'link', label: 'Mini hideable', to: '/sidebar_mini_hide'},
          {type: 'link', label: 'Mini hidden', to: '/sidebar_mini_hidden'},
          {type: 'divider'},
          {type: 'link', label: 'Light color', to: '/sidebar_default_color_light'},
          {type: 'link', label: 'Custom color', to: '/sidebar_default_color_custom'},
        ],
      },
      {
        type: 'group', label: "Secondary sidebar",
        children: [
          {type: 'link', label: 'After default', to: '/sidebar_secondary_after'},
          {type: 'link', label: 'Before default', to: '/sidebar_secondary_before'},
          {type: 'link', label: 'Hidden by default', to: '/sidebar_secondary_hidden'},
          {type: 'divider'},
          {type: 'link', label: 'Dark color', to: '/sidebar_secondary_color_dark'},
          {type: 'link', label: 'Custom color', to: '/sidebar_secondary_color_custom'},
        ],
      },
      {
        type: 'group', label: "Right sidebar",
        children: [
          {type: 'link', label: 'Show - collapse main', to: '/sidebar_right_default_collapse'},
          {type: 'link', label: 'Show - hide main', to: '/sidebar_right_default_hide'},
          {type: 'link', label: 'Show - fix default width', to: '/sidebar_right_default_toggle'},
          {type: 'link', label: 'Show - fix mini width', to: '/sidebar_right_mini_toggle'},
          {type: 'link', label: 'Show - hide secondary', to: '/sidebar_right_secondary_hide'},
          {type: 'link', label: 'Visible by default', to: '/sidebar_right_visible'},
          {type: 'divider'},
          {type: 'link', label: 'Dark color', to: '/sidebar_right_color_dark'},
          {type: 'link', label: 'Custom color', to: '/sidebar_right_color_custom'},
        ],
      },
      {
        type: 'group', label: "Content sidebar",
        children: [
          {type: 'link', label: 'Left position', to: '/sidebar_content_left'},
          {type: 'link', label: 'Left stretched', to: '/sidebar_content_left_stretch'},
          {type: 'link', label: 'Left hidden', to: '/sidebar_content_left_hidden'},
          {type: 'link', label: 'Right position', to: '/sidebar_content_right'},
          {type: 'link', label: 'Right stretched', to: '/sidebar_content_right_stretch'},
          {type: 'link', label: 'Right hidden', to: '/sidebar_content_right_hidden'},
          {type: 'link', label: 'Sectioned sidebar', to: '/sidebar_content_sections'},
          {type: 'divider'},
          {type: 'link', label: 'Dark color', to: '/sidebar_content_color_dark'},
          {type: 'link', label: 'Custom color', to: '/sidebar_content_color_custom'},
          {type: 'link', label: 'Custom sections color', to: '/sidebar_content_color_sections_custom'},
        ],
      },
      {type: 'divider'},
      {type: 'link', label: 'Sidebar components', to: '/sidebar_components'},
    ],
  },
  {
    type: 'group', label: "Navbars", icon: "menu3",
    children: [
      {
        type: 'group', label: "Single navbar",
        children: [
          {type: 'link', label: 'Single top static', to: '/navbar_single_top_static'},
          {type: 'link', label: 'Single top fixed', to: '/navbar_single_top_fixed'},
          {type: 'link', label: 'Single bottom static', to: '/navbar_single_bottom_static'},
          {type: 'link', label: 'Single bottom fixed', to: '/navbar_single_bottom_fixed'},
          {type: 'link', label: 'Before page header', to: '/navbar_single_header_before'},
          {type: 'link', label: 'After page header', to: '/navbar_single_header_after'},
          {type: 'link', label: 'After page content', to: '/navbar_single_content_after'},
        ],
      },
      {
        type: 'group', label: "Multiple navbars",
        children: [
          {type: 'link', label: 'Multiple top static', to: '/navbar_multiple_top_static'},
          {type: 'link', label: 'Multiple top fixed', to: '/navbar_multiple_top_fixed'},
          {type: 'link', label: 'Multiple bottom static', to: '/navbar_multiple_bottom_static'},
          {type: 'link', label: 'Multiple bottom fixed', to: '/navbar_multiple_bottom_fixed'},
          {type: 'link', label: 'Multiple - top and bottom', to: '/navbar_multiple_top_bottom'},
          {type: 'link', label: 'Multiple - secondary sticky', to: '/navbar_multiple_secondary_sticky'},
        ],
      },
      {
        type: 'group', label: "Content navbar",
        children: [
          {type: 'link', label: 'Single navbar', to: '/navbar_component_single'},
          {type: 'link', label: 'Multiple navbars', to: '/navbar_component_multiple'},
        ],
      },
      {type: 'divider'},
      {type: 'link', label: 'Color options', to: '/navbar_colors'},
      {type: 'link', label: 'Sizing options', to: '/navbar_sizes'},
      {type: 'link', label: 'Hide on scroll', to: '/navbar_hideable'},
      {type: 'link', label: 'Navbar components', to: '/navbar_components'},
    ],
  },
  {
    type: 'group', label: "Vertical navigation", icon: "sort",
    children: [
      {type: 'link', label: 'Collapsible menu', to: '/navigation_vertical_collapsible'},
      {type: 'link', label: 'Accordion menu', to: '/navigation_vertical_accordion'},
      {type: 'link', label: 'Bordered navigation', to: '/navigation_vertical_bordered'},
      {type: 'link', label: 'Right icons', to: '/navigation_vertical_right_icons'},
      {type: 'link', label: 'Badges', to: '/navigation_vertical_badges'},
      {type: 'link', label: 'Disabled items', to: '/navigation_vertical_disabled'},
    ],
  },
  {
    type: 'group', label: "Horizontal navigation", icon: "transmission",
    children: [
      {type: 'link', label: 'Submenu on click', to: '/navigation_horizontal_click'},
      {type: 'link', label: 'Submenu on hover', to: '/navigation_horizontal_hover'},
      {type: 'link', label: 'With custom elements', to: '/navigation_horizontal_elements'},
      {type: 'link', label: 'Tabbed navigation', to: '/navigation_horizontal_tabs'},
      {type: 'link', label: 'Disabled navigation links', to: '/navigation_horizontal_disabled'},
      {type: 'link', label: 'Horizontal mega menu', to: '/navigation_horizontal_mega'},
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
      {type: 'link', label: 'Line charts', to: '/echarts_lines'},
      {type: 'link', label: 'Area charts', to: '/echarts_areas'},
      {type: 'link', label: 'Columns and waterfalls', to: '/echarts_columns_waterfalls'},
      {type: 'link', label: 'Bars and tornados', to: '/echarts_bars_tornados'},
      {type: 'link', label: 'Scatter charts', to: '/echarts_scatter'},
      {type: 'link', label: 'Pies and donuts', to: '/echarts_pies_donuts'},
      {type: 'link', label: 'Funnels and calendars', to: '/echarts_funnels_calendars'},
      {type: 'link', label: 'Candlesticks and others', to: '/echarts_candlesticks_others'},
    ],
  },
  {
    type: 'group', label: "D3 library", icon: "statistics",
    children: [
      {type: 'link', label: 'Simple lines', to: '/d3_lines_basic'},
      {type: 'link', label: 'Advanced lines', to: '/d3_lines_advanced'},
      {type: 'link', label: 'Simple bars', to: '/d3_bars_basic'},
      {type: 'link', label: 'Advanced bars', to: '/d3_bars_advanced'},
      {type: 'link', label: 'Pie charts', to: '/d3_pies'},
      {type: 'link', label: 'Circle diagrams', to: '/d3_circle_diagrams'},
      {type: 'link', label: 'Tree layout', to: '/d3_tree'},
      {type: 'link', label: 'Other charts', to: '/d3_other'},
    ],
  },
  {
    type: 'group', label: "C3 library", icon: "stats-bars",
    children: [
      {type: 'link', label: 'Lines and areas', to: '/c3_lines_areas'},
      {type: 'link', label: 'Bars and pies', to: '/c3_bars_pies'},
      {type: 'link', label: 'Advanced examples', to: '/c3_advanced'},
      {type: 'link', label: 'Chart axis', to: '/c3_axis'},
      {type: 'link', label: 'Grid options', to: '/c3_grid'},
    ],
  },
  {
    type: 'group', label: "Google charts", icon: "google",
    children: [
      {type: 'link', label: 'Line charts', to: '/google_lines'},
      {type: 'link', label: 'Bar charts', to: '/google_bars'},
      {type: 'link', label: 'Pie charts', to: '/google_pies'},
      {type: 'link', label: 'Bubble & scatter charts', to: '/google_scatter_bubble'},
      {type: 'link', label: 'Other charts', to: '/google_other'},
    ],
  },
  {
    type: 'group', label: "Maps integration", icon: "map5",
    children: [
      {
        type: 'group', label: "Google maps",
        children: [
          {type: 'link', label: 'Basics', to: '/maps_google_basic'},
          {type: 'link', label: 'Controls', to: '/maps_google_controls'},
          {type: 'link', label: 'Markers', to: '/maps_google_markers'},
          {type: 'link', label: 'Map drawings', to: '/maps_google_drawings'},
          {type: 'link', label: 'Layers', to: '/maps_google_layers'},
        ],
      },
      {type: 'link', label: 'Vector maps', to: '/maps_vector'},
      {type: 'link', label: 'ECharts maps', to: '/maps_echarts', badge: {text: 'Coming soon'}, disabled: true},
    ],
  },
  {type: 'header', title: 'Extensions'},
  {
    type: 'group', label: "Extensions", icon: "puzzle4",
    children: [
      {type: 'link', label: 'Image cropper', to: '/extension_image_cropper'},
      {type: 'link', label: 'Block UI', to: '/extension_blockui'},
      {type: 'link', label: 'Drag and drop', to: '/extension_dnd'},
    ],
  },
  {
    type: 'group', label: "JQuery UI", icon: "popout",
    children: [
      {type: 'link', label: 'Interactions', to: '/jqueryui_interactions'},
      {type: 'link', label: 'Forms', to: '/jqueryui_forms'},
      {type: 'link', label: 'Components', to: '/jqueryui_components'},
      {type: 'link', label: 'Sliders', to: '/jqueryui_sliders'},
      {type: 'link', label: 'Navigation', to: '/jqueryui_navigation'},
    ],
  },
  {
    type: 'group', label: "File uploaders", icon: "upload",
    children: [
      {type: 'link', label: 'Plupload', to: '/uploader_plupload'},
      {type: 'link', label: 'Bootstrap file uploader', to: '/uploader_bootstrap'},
      {type: 'link', label: 'Dropzone', to: '/uploader_dropzone'},
    ],
  },
  {
    type: 'group', label: "Event calendars", icon: "calendar3",
    children: [
      {type: 'link', label: 'Basic views', to: '/fullcalendar_views'},
      {type: 'link', label: 'Event styling', to: '/fullcalendar_styling'},
      {type: 'link', label: 'Language and time', to: '/fullcalendar_formats'},
      {type: 'link', label: 'Advanced usage', to: '/fullcalendar_advanced'},
    ],
  },
  {
    type: 'group', label: "Internationalization", icon: "sphere",
    children: [
      {type: 'link', label: 'Direct translation', to: '/internationalization_switch_direct'},
      {type: 'link', label: 'Querystring parameter', to: '/internationalization_switch_query'},
      {type: 'link', label: 'Language fallback', to: '/internationalization_fallback'},
      {type: 'link', label: 'Callbacks', to: '/internationalization_callbacks'},
    ],
  },
  {type: 'header', title: 'Tables'},
  {
    type: 'group', label: "Basic tables", icon: "table2",
    children: [
      {type: 'link', label: 'Basic examples', to: '/table_basic'},
      {type: 'link', label: 'Table sizing', to: '/table_sizing'},
      {type: 'link', label: 'Table borders', to: '/table_borders'},
      {type: 'link', label: 'Table styling', to: '/table_styling'},
      {type: 'link', label: 'Table elements', to: '/table_elements'},
    ],
  },
  {
    type: 'group', label: "Data tables", icon: "grid7",
    children: [
      {type: 'link', label: 'Basic initialization', to: '/datatable_basic'},
      {type: 'link', label: 'Basic styling', to: '/datatable_styling'},
      {type: 'link', label: 'Advanced examples', to: '/datatable_advanced'},
      {type: 'link', label: 'Sorting options', to: '/datatable_sorting'},
      {type: 'link', label: 'Using API', to: '/datatable_api'},
      {type: 'link', label: 'Data sources', to: '/datatable_data_sources'},
    ],
  },
  {
    type: 'group', label: "Data tables extensions", icon: "alignment-unalign",
    children: [
      {type: 'link', label: 'Columns reorder', to: '/datatable_extension_reorder'},
      {type: 'link', label: 'Row reorder', to: '/datatable_extension_row_reorder'},
      {type: 'link', label: 'Fixed columns', to: '/datatable_extension_fixed_columns'},
      {type: 'link', label: 'Fixed header', to: '/datatable_extension_fixed_header'},
      {type: 'link', label: 'Auto fill', to: '/datatable_extension_autofill'},
      {type: 'link', label: 'Key table', to: '/datatable_extension_key_table'},
      {type: 'link', label: 'Scroller', to: '/datatable_extension_scroller'},
      {type: 'link', label: 'Select', to: '/datatable_extension_select'},
      {
        type: 'group', label: "Buttons",
        children: [
          {type: 'link', label: 'Initialization', to: '/datatable_extension_buttons_init'},
          {type: 'link', label: 'Flash buttons', to: '/datatable_extension_buttons_flash'},
          {type: 'link', label: 'Print buttons', to: '/datatable_extension_buttons_print'},
          {type: 'link', label: 'HTML5 buttons', to: '/datatable_extension_buttons_html5'},
        ],
      },
      {type: 'link', label: 'Columns visibility', to: '/datatable_extension_colvis'},
    ],
  },
  {
    type: 'group', label: "Responsive tables", icon: "versions",
    children: [
      {type: 'link', label: 'Responsive basic tables', to: '/table_responsive'},
      {type: 'link', label: 'Responsive data tables', to: '/datatable_responsive'},
    ],
  },
  {type: 'header', title: 'Page kits'},
  {
    type: 'group', label: "General pages", icon: "grid6",
    children: [
      {type: 'link', label: 'Feed', to: '/general_feed'},
      {type: 'link', label: 'Embeds', to: '/general_embeds'},
      {type: 'link', label: 'FAQ page', to: '/general_faq'},
      {type: 'link', label: 'Knowledgebase', to: '/general_knowledgebase'},
      {
        type: 'group', label: "Blog",
        children: [
          {type: 'link', label: 'Classic vertical', to: '/blog_classic_v'},
          {type: 'link', label: 'Classic horizontal', to: '/blog_classic_h'},
          {type: 'link', label: 'Grid', to: '/blog_grid'},
          {type: 'link', label: 'Single post', to: '/blog_single'},
          {type: 'divider'},
          {type: 'link', label: 'Left sidebar', to: '/blog_sidebar_left'},
          {type: 'link', label: 'Right sidebar', to: '/blog_sidebar_right'},
        ],
      },
      {
        type: 'group', label: "Timelines",
        children: [
          {type: 'link', label: 'Left timeline', to: '/timelines_left'},
          {type: 'link', label: 'Right timeline', to: '/timelines_right'},
          {type: 'link', label: 'Centered timeline', to: '/timelines_center'},
        ],
      },
      {
        type: 'group', label: "Gallery",
        children: [
          {type: 'link', label: 'Media grid', to: '/gallery_grid'},
          {type: 'link', label: 'Media with titles', to: '/gallery_titles'},
          {type: 'link', label: 'Media with description', to: '/gallery_description'},
          {type: 'link', label: 'Media library', to: '/gallery_library'},
        ],
      },
    ],
  },
  {
    type: 'group', label: "Service pages", icon: "wrench3",
    children: [
      {type: 'link', label: 'Sitemap', to: '/service_sitemap'},
      {
        type: 'group', label: "Invoicing",
        children: [
          {type: 'link', label: 'Invoice template', to: '/invoice_template'},
          {type: 'link', label: 'Invoice grid', to: '/invoice_grid'},
          {type: 'link', label: 'Invoice archive', to: '/invoice_archive'},
        ],
      },
      {
        type: 'group', label: "Authentication",
        children: [
          {type: 'link', label: 'Simple login', to: '/login_simple'},
          {type: 'link', label: 'More login info', to: '/login_advanced'},
          {type: 'link', label: 'Simple registration', to: '/login_registration'},
          {type: 'link', label: 'More registration info', to: '/login_registration_advanced'},
          {type: 'link', label: 'Unlock user', to: '/login_unlock'},
          {type: 'link', label: 'Reset password', to: '/login_password_recover'},
          {type: 'link', label: 'Hide navbar', to: '/login_hide_navbar'},
          {type: 'link', label: 'Transparent box', to: '/login_transparent'},
          {type: 'link', label: 'Background option', to: '/login_background'},
          {type: 'link', label: 'With validation', to: '/login_validation'},
          {type: 'link', label: 'Tabbed form', to: '/login_tabbed'},
          {type: 'link', label: 'Inside modals', to: '/login_modals'},
        ],
      },
      {
        type: 'group', label: "Error pages",
        children: [
          {type: 'link', label: 'Error 403', to: '/error_403'},
          {type: 'link', label: 'Error 404', to: '/error_404'},
          {type: 'link', label: 'Error 405', to: '/error_405'},
          {type: 'link', label: 'Error 500', to: '/error_500'},
          {type: 'link', label: 'Error 503', to: '/error_503'},
          {type: 'link', label: 'Offline page', to: '/error_offline'},
        ],
      },
    ],
  },
  {
    type: 'group', label: "User pages", icon: "people",
    children: [
      {type: 'link', label: 'User list', to: '/user_pages_list'},
      {type: 'link', label: 'User cards', to: '/user_pages_cards'},
      {type: 'link', label: 'Simple profile', to: '/user_pages_profile'},
      {type: 'link', label: 'Tabbed profile', to: '/user_pages_profile_tabbed'},
      {type: 'link', label: 'Profile with cover', to: '/user_pages_profile_cover'},
    ],
  },
  {
    type: 'group', label: "Application pages", icon: "cube3",
    children: [
      {
        type: 'group', label: "Task manager",
        children: [
          {type: 'link', label: 'Task grid', to: '/task_manager_grid'},
          {type: 'link', label: 'Task list', to: '/task_manager_list'},
          {type: 'link', label: 'Task detailed', to: '/task_manager_detailed'},
        ],
      },
      {
        type: 'group', label: "Inbox",
        children: [
          {type: 'link', label: 'Mail list', to: '/mail_list'},
          {type: 'link', label: 'Mail list (detached)', to: '/mail_list_detached'},
          {type: 'link', label: 'Read mail', to: '/mail_read'},
          {type: 'link', label: 'Write mail', to: '/mail_write'},
          {type: 'divider'},
          {type: 'link', label: 'Chat layouts', to: '/chat_layouts'},
          {type: 'link', label: 'Chat options', to: '/chat_options'},
        ],
      },
      {
        type: 'group', label: "Search",
        children: [
          {type: 'link', label: 'Basic search results', to: '/search_basic'},
          {type: 'link', label: 'User search results', to: '/search_users'},
          {type: 'link', label: 'Image search results', to: '/search_images'},
          {type: 'link', label: 'Video search results', to: '/search_videos'},
        ],
      },
      {
        type: 'group', label: "Job search",
        children: [
          {type: 'link', label: 'Cards view', to: '/job_list_cards'},
          {type: 'link', label: 'List view', to: '/job_list_list'},
          {type: 'link', label: 'Job detailed', to: '/job_detailed'},
          {type: 'link', label: 'Apply', to: '/job_apply'},
        ],
      },
      {
        type: 'group', label: "Learning",
        children: [
          {type: 'link', label: 'List view', to: '/learning_list'},
          {type: 'link', label: 'Grid view', to: '/learning_grid'},
          {type: 'link', label: 'Detailed course', to: '/learning_detailed'},
        ],
      },
      {
        type: 'group', label: "Ecommerce set",
        children: [
          {type: 'link', label: 'Product list', to: '/ecommerce_product_list'},
          {type: 'link', label: 'Product grid', to: '/ecommerce_product_grid'},
          {type: 'link', label: 'Orders history', to: '/ecommerce_orders_history'},
          {type: 'link', label: 'Customers', to: '/ecommerce_customers'},
          {type: 'link', label: 'Pricing tables', to: '/ecommerce_pricing'},
        ],
      },
    ],
  },
  {
    type: 'group', label: "Widgets", icon: "atom2",
    children: [
      {type: 'link', label: 'Content widgets', to: '/widgets_content'},
      {type: 'link', label: 'Statistics widgets', to: '/widgets_stats'},
      {type: 'link', label: 'Menu widgets', to: '/widgets_menu', badge: {text: 'Coming soon'}, disabled: true},
      {type: 'link', label: 'Form widgets', to: '/widgets_form', badge: {text: 'Coming soon'}, disabled: true},
    ],
  },
]