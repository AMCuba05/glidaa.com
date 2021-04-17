/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUserActivity = /* GraphQL */ `
  query GetUserActivity($id: ID!) {
    getUserActivity(id: $id) {
      id
      phone
      cursorPosition
      createdAt
      updatedAt
    }
  }
`;
export const listUserActivitys = /* GraphQL */ `
  query ListUserActivitys(
    $filter: ModelUserActivityFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUserActivitys(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        phone
        cursorPosition
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getEmailTemplate = /* GraphQL */ `
  query GetEmailTemplate($id: ID!) {
    getEmailTemplate(id: $id) {
      id
      name
      subject
      htmlBody
      textBody
      files
      createdAt
      updatedAt
    }
  }
`;
export const listEmailTemplates = /* GraphQL */ `
  query ListEmailTemplates(
    $filter: ModelEmailTemplateFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listEmailTemplates(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        subject
        htmlBody
        textBody
        files
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getClientQuery = /* GraphQL */ `
  query GetClientQuery($id: ID!) {
    getClientQuery(id: $id) {
      id
      name
      query
      createdAt
      updatedAt
    }
  }
`;
export const listClientQuerys = /* GraphQL */ `
  query ListClientQuerys(
    $filter: ModelClientQueryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listClientQuerys(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        query
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getEmailJob = /* GraphQL */ `
  query GetEmailJob($id: ID!) {
    getEmailJob(id: $id) {
      id
      name
      queryId
      templateId
      limit
      emails
      status
      createdAt
      updatedAt
    }
  }
`;
export const listEmailJobs = /* GraphQL */ `
  query ListEmailJobs(
    $filter: ModelEmailJobFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listEmailJobs(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        queryId
        templateId
        limit
        emails
        status
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getVodAsset = /* GraphQL */ `
  query GetVodAsset($id: ID!) {
    getVodAsset(id: $id) {
      id
      title
      description
      video {
        id
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const listVodAssets = /* GraphQL */ `
  query ListVodAssets(
    $filter: ModelvodAssetFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listVodAssets(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        description
        video {
          id
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getVideoObject = /* GraphQL */ `
  query GetVideoObject($id: ID!) {
    getVideoObject(id: $id) {
      id
      createdAt
      updatedAt
    }
  }
`;
export const listVideoObjects = /* GraphQL */ `
  query ListVideoObjects(
    $filter: ModelvideoObjectFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listVideoObjects(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
