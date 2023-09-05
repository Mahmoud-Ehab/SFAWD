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
  httpEquivs?: Array<{
    name: 'content-security-policy' | 'content-type' | 'default-style' | 'refresh';
    content: string;
  }>;
  css?: string;
}
