// [...slug] params

import { SiteRouter } from "../_components/sitePage";

export default function Page({ params }: { params: { slug: string[] } }) {
  return <SiteRouter params={params} />;
}
