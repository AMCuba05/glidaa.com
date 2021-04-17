/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUserActivity = /* GraphQL */ `
  subscription OnCreateUserActivity {
    onCreateUserActivity {
      id
      phone
      cursorPosition
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateUserActivity = /* GraphQL */ `
  subscription OnUpdateUserActivity {
    onUpdateUserActivity {
      id
      phone
      cursorPosition
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteUserActivity = /* GraphQL */ `
  subscription OnDeleteUserActivity {
    onDeleteUserActivity {
      id
      phone
      cursorPosition
      createdAt
      updatedAt
    }
  }
`;
export const onCreateEmailTemplate = /* GraphQL */ `
  subscription OnCreateEmailTemplate {
    onCreateEmailTemplate {
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
export const onUpdateEmailTemplate = /* GraphQL */ `
  subscription OnUpdateEmailTemplate {
    onUpdateEmailTemplate {
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
export const onDeleteEmailTemplate = /* GraphQL */ `
  subscription OnDeleteEmailTemplate {
    onDeleteEmailTemplate {
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
export const onCreateClientQuery = /* GraphQL */ `
  subscription OnCreateClientQuery {
    onCreateClientQuery {
      id
      name
      query
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateClientQuery = /* GraphQL */ `
  subscription OnUpdateClientQuery {
    onUpdateClientQuery {
      id
      name
      query
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteClientQuery = /* GraphQL */ `
  subscription OnDeleteClientQuery {
    onDeleteClientQuery {
      id
      name
      query
      createdAt
      updatedAt
    }
  }
`;
export const onCreateEmailJob = /* GraphQL */ `
  subscription OnCreateEmailJob {
    onCreateEmailJob {
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
export const onUpdateEmailJob = /* GraphQL */ `
  subscription OnUpdateEmailJob {
    onUpdateEmailJob {
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
export const onDeleteEmailJob = /* GraphQL */ `
  subscription OnDeleteEmailJob {
    onDeleteEmailJob {
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
export const onCreateVodAsset = /* GraphQL */ `
  subscription OnCreateVodAsset {
    onCreateVodAsset {
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
export const onUpdateVodAsset = /* GraphQL */ `
  subscription OnUpdateVodAsset {
    onUpdateVodAsset {
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
export const onDeleteVodAsset = /* GraphQL */ `
  subscription OnDeleteVodAsset {
    onDeleteVodAsset {
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
export const onCreateVideoObject = /* GraphQL */ `
  subscription OnCreateVideoObject {
    onCreateVideoObject {
      id
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateVideoObject = /* GraphQL */ `
  subscription OnUpdateVideoObject {
    onUpdateVideoObject {
      id
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteVideoObject = /* GraphQL */ `
  subscription OnDeleteVideoObject {
    onDeleteVideoObject {
      id
      createdAt
      updatedAt
    }
  }
`;
