export type EventCategory =
  | 'main'
  | 'gnb'
  | 'project'
  | 'activity'
  | 'support'
  | 'faq'
  | 'apply'
  | 'scroll';

export type EventAction =
  | 'click'
  | 'view'
  | 'tab_click'
  | 'scroll_depth'
  | 'button_click'
  | 'card_click';

export interface EventProperties {
  page_name?: string;
  section_name?: string;
  item_name?: string;
  tab_name?: string;
  card_id?: string;
  scroll_depth?: number;
  button_name?: string;
  position_name?: string;
  [key: string]: string | number | boolean | undefined;
}

export interface AmplitudeContextType {
  trackEvent: (category: EventCategory, action: EventAction, properties?: EventProperties) => void;
}
