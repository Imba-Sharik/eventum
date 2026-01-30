import type { Schema, Struct } from '@strapi/strapi';

export interface SharedLink extends Struct.ComponentSchema {
  collectionName: 'components_shared_links';
  info: {
    description: '\u0421\u0441\u044B\u043B\u043A\u0430 \u0441 \u0442\u0435\u043A\u0441\u0442\u043E\u043C';
    displayName: 'Link';
    icon: 'link';
  };
  attributes: {
    label: Schema.Attribute.String & Schema.Attribute.Required;
    url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedLinkGroup extends Struct.ComponentSchema {
  collectionName: 'components_shared_link_groups';
  info: {
    description: '\u0413\u0440\u0443\u043F\u043F\u0430 \u0441\u0441\u044B\u043B\u043E\u043A \u0434\u043B\u044F \u0444\u0443\u0442\u0435\u0440\u0430';
    displayName: 'Link Group';
    icon: 'bulletList';
  };
  attributes: {
    links: Schema.Attribute.Component<'shared.link', true>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedServiceOption extends Struct.ComponentSchema {
  collectionName: 'components_shared_service_options';
  info: {
    description: '\u041E\u043F\u0446\u0438\u044F \u0443\u0441\u043B\u0443\u0433\u0438 \u0434\u043B\u044F \u0444\u043E\u0440\u043C\u044B \u043A\u043E\u043D\u0442\u0430\u043A\u0442\u043E\u0432';
    displayName: 'Service Option';
    icon: 'check';
  };
  attributes: {
    label: Schema.Attribute.String & Schema.Attribute.Required;
    serviceId: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedSocialLink extends Struct.ComponentSchema {
  collectionName: 'components_shared_social_links';
  info: {
    description: '\u0421\u0441\u044B\u043B\u043A\u0430 \u043D\u0430 \u0441\u043E\u0446\u0438\u0430\u043B\u044C\u043D\u0443\u044E \u0441\u0435\u0442\u044C';
    displayName: 'Social Link';
    icon: 'link';
  };
  attributes: {
    platform: Schema.Attribute.Enumeration<
      ['vk', 'telegram', 'instagram', 'youtube', 'twitter']
    > &
      Schema.Attribute.Required;
    url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedStatistic extends Struct.ComponentSchema {
  collectionName: 'components_shared_statistics';
  info: {
    description: '\u0411\u043B\u043E\u043A \u0441\u0442\u0430\u0442\u0438\u0441\u0442\u0438\u043A\u0438 \u0441 \u0447\u0438\u0441\u043B\u043E\u043C \u0438 \u043F\u043E\u0434\u043F\u0438\u0441\u044C\u044E';
    displayName: 'Statistic';
    icon: 'chartLine';
  };
  attributes: {
    label: Schema.Attribute.String & Schema.Attribute.Required;
    prefix: Schema.Attribute.String & Schema.Attribute.DefaultTo<''>;
    suffix: Schema.Attribute.String & Schema.Attribute.DefaultTo<''>;
    value: Schema.Attribute.Integer & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'shared.link': SharedLink;
      'shared.link-group': SharedLinkGroup;
      'shared.service-option': SharedServiceOption;
      'shared.social-link': SharedSocialLink;
      'shared.statistic': SharedStatistic;
    }
  }
}
