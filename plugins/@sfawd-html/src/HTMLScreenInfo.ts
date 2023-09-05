export interface HTMLScreenInfo {
  author?: string;
  description?: string;
  charset?: string;
  keywords?: string;
  title?: string;
  viewport?: string;
  fonts?: Array<{
    fontName: string;
    url: string;
  }>;
  links?: Array<{
    rel: string;
    href: string;
  }>;
  css?: string;
}
