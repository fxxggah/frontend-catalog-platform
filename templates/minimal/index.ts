import type { StoreTemplateModule } from "../base/types";

import { MinimalHomeTemplate } from "../minimal/pages/MinimalHomeTemplate";
import { MinimalCategoryTemplate } from "../minimal/pages/MinimalCategoryTemplate";
import { MinimalProductTemplate } from "../minimal/pages/MinimalProductTemplate";
import { MinimalCartTemplate } from "../minimal/pages/MinimalCartTemplate";

export const minimalTemplate: StoreTemplateModule = {
  Home: MinimalHomeTemplate,
  Category: MinimalCategoryTemplate,
  Product: MinimalProductTemplate,
  Cart: MinimalCartTemplate,
};