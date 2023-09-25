export interface newsSchema {
  apiUrl: string;
  id: string;
  isHosted: boolean;
  pillarId: string;
  pillarName: string;
  sectionId: string;
  sectionName: string;
  type: string;
  webPublicationDate: Date;
  webTitle: string;
  webUrl: string;
  fields: {
    thumbnail: string;
  };
}
