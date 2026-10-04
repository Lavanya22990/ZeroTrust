document.addEventListener('DOMContentLoaded', () => {
  const navItems = document.querySelectorAll('.nav-item');
  const sections = document.querySelectorAll('[data-section]');
  const pageTitle = document.querySelector('#page-title');
  const dashboardActions = document.querySelector('.topbar-actions');
  const organizationList = document.querySelector('#dashboard-organizations');
  const organizationCount = document.querySelector('#organization-count');
  const healthValue = document.querySelector('#api-health-value');
  const healthNote = document.querySelector('#api-health-note');
  const healthDetail = document.querySelector('#api-health-detail');
  const healthIndicator = document.querySelector('#api-health-indicator');
  const sidebarHealthState = document.querySelector('#sidebar-api-state');
  const sidebarHealthLabel = document.querySelector('#sidebar-api-label');
  const sidebarHealthNote = document.querySelector('#sidebar-api-note');
  const refreshButton = document.querySelector('#refresh-dashboard');
  const organizationSearch = document.querySelector('#organization-search');
  const organizationDirectory = document.querySelector('#organization-directory');
  const organizationPageMessage = document.querySelector('#organization-page-message');
  const organizationPageCount = document.querySelector('#organization-page-count');
  const organizationPageSearch = document.querySelector('#organization-page-search');
  const organizationRefreshButton = document.querySelector('#organization-refresh');
  const organizationDialog = document.querySelector('#organization-dialog');
  const organizationCreateForm = document.querySelector('#organization-create-form');
  const organizationCreateOpen = document.querySelector('#organization-create-open');
  const organizationCreateCancel = document.querySelector('#organization-create-cancel');
  const organizationDialogClose = document.querySelector('#organization-dialog-close');
  const organizationCreateSubmit = document.querySelector('#organization-create-submit');
  const organizationFormMessage = document.querySelector('#organization-form-message');
  const projectOrganizationSelect = document.querySelector('#project-organization');
  const projectLoginForm = document.querySelector('#project-login-form');
  const projectLoginSubmit = document.querySelector('#project-login-submit');
  const projectLogoutButton = document.querySelector('#project-logout');
  const projectRefreshButton = document.querySelector('#project-refresh');
  const projectCreateOpen = document.querySelector('#project-create-open');
  const projectMessage = document.querySelector('#project-message');
  const projectDirectory = document.querySelector('#project-directory');
  const projectDialog = document.querySelector('#project-dialog');
  const projectCreateForm = document.querySelector('#project-create-form');
  const projectTeamSelect = document.querySelector('#project-team');
  const projectCreateSubmit = document.querySelector('#project-create-submit');
  const projectFormMessage = document.querySelector('#project-form-message');
  const teamCreateOpen = document.querySelector('#team-create-open');
  const teamRefreshButton = document.querySelector('#team-refresh');
  const teamSignInLink = document.querySelector('#team-sign-in-link');
  const teamMessage = document.querySelector('#team-message');
  const teamDirectory = document.querySelector('#team-directory');
  const teamDialog = document.querySelector('#team-dialog');
  const teamCreateForm = document.querySelector('#team-create-form');
  const teamCreateSubmit = document.querySelector('#team-create-submit');
  const teamFormMessage = document.querySelector('#team-form-message');
  const userInviteOpen = document.querySelector('#user-invite-open');
  const userRefreshButton = document.querySelector('#user-refresh');
  const userSignInLink = document.querySelector('#user-sign-in-link');
  const userSearch = document.querySelector('#user-search');
  const userMessage = document.querySelector('#user-message');
  const userDirectory = document.querySelector('#user-directory');
  const userDialog = document.querySelector('#user-dialog');
  const userInviteForm = document.querySelector('#user-invite-form');
  const userInviteSubmit = document.querySelector('#user-invite-submit');
  const userFormMessage = document.querySelector('#user-form-message');
  const dataSourceCreateOpen = document.querySelector('#data-source-create-open');
  const dataSourceRefreshButton = document.querySelector('#data-source-refresh');
  const dataSourceSignInLink = document.querySelector('#data-source-sign-in-link');
  const dataSourceMessage = document.querySelector('#data-source-message');
  const dataSourceDirectory = document.querySelector('#data-source-directory');
  const dataSourceDialog = document.querySelector('#data-source-dialog');
  const dataSourceCreateForm = document.querySelector('#data-source-create-form');
  const dataSourceCreateSubmit = document.querySelector('#data-source-create-submit');
  const dataSourceFormMessage = document.querySelector('#data-source-form-message');
  const ragRefreshButton = document.querySelector('#rag-refresh');
  const ragSignInLink = document.querySelector('#rag-sign-in-link');
  const ragMessage = document.querySelector('#rag-message');
  const ragDocumentList = document.querySelector('#rag-document-list');
  const ragUploadForm = document.querySelector('#rag-upload-form');
  const ragFileInput = document.querySelector('#rag-file');
  const ragUploadSubmit = document.querySelector('#rag-upload-submit');
  const ragUploadMessage = document.querySelector('#rag-upload-message');
  const ragQueryForm = document.querySelector('#rag-query-form');
  const ragQuerySubmit = document.querySelector('#rag-query-submit');
  const ragQueryMessage = document.querySelector('#rag-query-message');
  const ragAnswer = document.querySelector('#rag-answer');
  const ragAnswerText = document.querySelector('#rag-answer-text');
  const ragRecommendation = document.querySelector('#rag-recommendation');
  const ragResults = document.querySelector('#rag-results');
  const mlPageMessage = document.querySelector('#ml-page-message');
  const mlRefreshButton = document.querySelector('#ml-refresh');
  const mlSignInLink = document.querySelector('#ml-sign-in-link');
  const mlModelStatus = document.querySelector('#ml-model-status');
  const mlModelSchema = document.querySelector('#ml-model-schema');
  const mlAnalysisForm = document.querySelector('#ml-analysis-form');
  const mlSourceSelect = document.querySelector('#ml-source');
  const mlEventData = document.querySelector('#ml-event-data');
  const mlContextData = document.querySelector('#ml-context-data');
  const mlPrepareButton = document.querySelector('#ml-prepare-data');
  const mlRunButton = document.querySelector('#ml-run-model');
  const mlActionMessage = document.querySelector('#ml-action-message');
  const mlResultPanel = document.querySelector('#ml-result-panel');
  const mlResultTitle = document.querySelector('#ml-result-title');
  const mlResultOutput = document.querySelector('#ml-result-output');
  let projectAccessToken = sessionStorage.getItem('projectAccessToken') || '';
  let projectOrganizationId = sessionStorage.getItem('projectOrganizationId') || '';
  let organizationUsers = [];
  let organizationDataSources = [];
  let ragDocuments = [];
  let organizations = [];
  let organizationPageRecords = [];
  let createdOrganizationRecords = [];
  let organizationListFailed = false;
  const pageTitles = {
    dashboard: 'Security operations',
    organizations: 'Organizations',
    projects: 'Projects',
    teams: 'Teams',
    users: 'Users',
    'data-sources': 'Data sources',
    rag: 'RAG / documents',
    'risk-analysis': 'Risk & ML',
    settings: 'Settings',
  };

  const setActiveSection = (targetId) => {
    pageTitle.textContent = pageTitles[targetId] || pageTitles.dashboard;
    dashboardActions.hidden = targetId !== 'dashboard';

    navItems.forEach((item) => {
      const isActive = item.getAttribute('href') === `#${targetId}`;
      item.classList.toggle('active', isActive);
      if (isActive) {
        item.setAttribute('aria-current', 'page');
      } else {
        item.removeAttribute('aria-current');
      }
    });

    sections.forEach((section) => {
      const isVisible = section.id === targetId;
      section.classList.toggle('is-visible', isVisible);
    });
  };

  const setOrganizationMessage = (message, isError = false) => {
    const text = document.createElement('p');
    text.className = 'home-message';
    text.textContent = message;

    if (isError) {
      const retry = document.createElement('button');
      retry.className = 'button button-secondary';
      retry.type = 'button';
      retry.textContent = 'Try again';
      retry.addEventListener('click', loadHomeDashboard);
      organizationList.replaceChildren(text, retry);
      organizationList.setAttribute('role', 'alert');
      return;
    }

    organizationList.replaceChildren(text);
    organizationList.setAttribute('role', 'status');
  };

  const setProjectMessage = (message, isError = false) => {
    projectMessage.textContent = message;
    projectMessage.classList.toggle('is-error', isError);
  };

  const setTeamMessage = (message, isError = false) => {
    teamMessage.textContent = message;
    teamMessage.classList.toggle('is-error', isError);
  };

  const setUserMessage = (message, isError = false) => {
    userMessage.textContent = message;
    userMessage.classList.toggle('is-error', isError);
  };

  const setDataSourceMessage = (message, isError = false) => {
    dataSourceMessage.textContent = message;
    dataSourceMessage.classList.toggle('is-error', isError);
  };

  const setRagMessage = (message, isError = false) => {
    ragMessage.textContent = message;
    ragMessage.classList.toggle('is-error', isError);
  };

  const setMlPageMessage = (message, isError = false) => {
    mlPageMessage.textContent = message;
    mlPageMessage.classList.toggle('is-error', isError);
  };

  async function requestMlApi(url, options = {}) {
    const response = await fetch(url, options);
    const result = await response.json().catch(() => ({}));
    if (!response.ok) {
      const detail = result.detail;
      const detailMessage = typeof detail === 'string'
        ? detail
        : Array.isArray(detail)
          ? detail.map((issue) => issue.msg || issue.message).filter(Boolean).join(' ')
          : '';
      throw new Error(detailMessage || result.message || `Request failed (${response.status}).`);
    }
    return result;
  }

  async function requestProjectApi(url, options = {}) {
    const response = await fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${projectAccessToken}`,
      },
    });
    const result = await response.json().catch(() => ({}));
    if (!response.ok) {
      const detail = result.detail;
      const detailMessage = typeof detail === 'string'
        ? detail
        : Array.isArray(detail)
          ? detail.map((issue) => issue.msg || issue.message).filter(Boolean).join(' ')
          : '';
      throw new Error(detailMessage || result.message || `Request failed (${response.status}).`);
    }
    return result;
  }

  const renderProjects = (projects) => {
    if (!projects.length) {
      projectDirectory.replaceChildren();
      setProjectMessage('No projects are registered for this organization.');
      return;
    }

    const cards = projects.map((project) => {
      const card = document.createElement('article');
      card.className = 'mini-card reusable-card';

      const name = document.createElement('h3');
      name.textContent = project.name || 'Unnamed project';

      const description = document.createElement('p');
      description.className = 'project-card-description';
      description.textContent = project.description || 'No description provided.';

      const metadata = document.createElement('div');
      metadata.className = 'project-card-meta';
      const memberCount = document.createElement('span');
      memberCount.textContent = `${project.member_count || 0} members`;

      const status = document.createElement('span');
      const normalizedStatus = (project.status || 'unknown').toLowerCase();
      status.className = `badge ${normalizedStatus === 'active' ? 'success' : 'neutral'}`;
      status.textContent = project.status || 'Unknown';

      metadata.append(memberCount, status);
      card.append(name, description, metadata);
      return card;
    });

    projectDirectory.replaceChildren(...cards);
    setProjectMessage(`${projects.length} project${projects.length === 1 ? '' : 's'} loaded.`);
  };

  const updateProjectAuthControls = () => {
    const isSignedIn = Boolean(projectAccessToken && projectOrganizationId);
    projectLoginForm.hidden = isSignedIn;
    projectLogoutButton.hidden = !isSignedIn;
    projectRefreshButton.disabled = !isSignedIn;
    projectCreateOpen.disabled = !isSignedIn;
    projectOrganizationSelect.disabled = !isSignedIn;
    teamCreateOpen.disabled = !isSignedIn;
    teamRefreshButton.disabled = !isSignedIn;
    teamSignInLink.hidden = isSignedIn;
    userInviteOpen.disabled = !isSignedIn;
    userRefreshButton.disabled = !isSignedIn;
    userSignInLink.hidden = isSignedIn;
    dataSourceCreateOpen.disabled = !isSignedIn;
    dataSourceRefreshButton.disabled = !isSignedIn;
    dataSourceSignInLink.hidden = isSignedIn;
    ragRefreshButton.disabled = !isSignedIn;
    ragSignInLink.hidden = isSignedIn;
    ragUploadSubmit.disabled = !isSignedIn;
    ragQuerySubmit.disabled = !isSignedIn;
    mlPrepareButton.disabled = !isSignedIn;
    mlSignInLink.hidden = isSignedIn;
  };

  async function loadProjectOrganizations() {
    const response = await fetch('/api/organizations');
    if (!response.ok) {
      throw new Error(`Organizations request returned ${response.status}.`);
    }
    const result = await response.json();
    const organization = (result.organizations || []).find((item) => item.id === projectOrganizationId);
    const option = document.createElement('option');
    option.value = projectOrganizationId;
    option.textContent = organization ? organization.name : projectOrganizationId;
    projectOrganizationSelect.replaceChildren(option);
    projectOrganizationSelect.value = projectOrganizationId;
    await loadProjects();
  }

  async function loadProjects() {
    if (!projectAccessToken || !projectOrganizationId) {
      setProjectMessage('Sign in to load projects.');
      return;
    }

    projectRefreshButton.disabled = true;
    projectDirectory.setAttribute('aria-busy', 'true');
    setProjectMessage('Loading projects…');
    try {
      const result = await requestProjectApi(
        `/api/projects/organizations/${encodeURIComponent(projectOrganizationId)}/projects`
      );
      renderProjects(result.data?.projects || []);
    } catch (error) {
      if (error.message.toLowerCase().includes('token') || error.message.toLowerCase().includes('credential')) {
        projectAccessToken = '';
        projectOrganizationId = '';
        sessionStorage.removeItem('projectAccessToken');
        sessionStorage.removeItem('projectOrganizationId');
        projectOrganizationSelect.replaceChildren(new Option('Sign in to select an organization', ''));
        updateProjectAuthControls();
      }
      projectDirectory.replaceChildren();
      setProjectMessage(error.message || 'Projects could not be loaded.', true);
    } finally {
      projectDirectory.setAttribute('aria-busy', 'false');
      projectRefreshButton.disabled = !projectAccessToken;
    }
  }

  async function loadTeams() {
    if (!projectAccessToken || !projectOrganizationId) {
      teamDirectory.replaceChildren();
      setTeamMessage('Sign in from Projects to load teams.');
      return;
    }

    teamRefreshButton.disabled = true;
    teamDirectory.setAttribute('aria-busy', 'true');
    setTeamMessage('Loading teams…');
    try {
      const result = await requestProjectApi(
        `/api/teams/organizations/${encodeURIComponent(projectOrganizationId)}/teams`
      );
      const teams = result.data?.teams || [];
      if (!teams.length) {
        teamDirectory.replaceChildren();
        setTeamMessage('No teams are registered for this organization.');
        return;
      }

      const rows = teams.map((team) => {
        const row = document.createElement('div');
        row.className = 'list-item';

        const details = document.createElement('div');
        const name = document.createElement('strong');
        name.textContent = team.name || 'Unnamed team';
        const description = document.createElement('span');
        description.textContent = team.description || 'No description provided';
        details.append(name, description);

        const status = document.createElement('span');
        status.className = 'badge neutral';
        status.textContent = `${team.member_count || 0} members · ${team.status || 'unknown'}`;
        row.append(details, status);
        return row;
      });

      teamDirectory.replaceChildren(...rows);
      setTeamMessage(`${teams.length} team${teams.length === 1 ? '' : 's'} loaded.`);
    } catch (error) {
      teamDirectory.replaceChildren();
      setTeamMessage(error.message || 'Teams could not be loaded.', true);
    } finally {
      teamDirectory.setAttribute('aria-busy', 'false');
      teamRefreshButton.disabled = !projectAccessToken;
    }
  }

  const renderUsers = () => {
    const query = userSearch.value.trim().toLocaleLowerCase();
    const filteredUsers = organizationUsers.filter((user) => {
      const searchable = [user.name, user.email, user.role_name, user.status]
        .filter(Boolean)
        .join(' ')
        .toLocaleLowerCase();
      return searchable.includes(query);
    });

    if (!filteredUsers.length) {
      userDirectory.replaceChildren();
      setUserMessage(organizationUsers.length ? 'No users match this search.' : 'No users are registered for this organization.');
      return;
    }

    const rows = filteredUsers.map((user) => {
      const row = document.createElement('div');
      row.className = 'list-item user-directory-row';

      const identity = document.createElement('div');
      identity.className = 'user-directory-identity';
      const name = document.createElement('strong');
      name.textContent = user.name || 'Unnamed user';
      const email = document.createElement('span');
      email.textContent = `${user.email || 'No email'} · ${user.role_name || 'No role assigned'}`;
      identity.append(name, email);

      const status = document.createElement('span');
      status.className = `badge ${user.status === 'active' ? 'success' : 'neutral'}`;
      status.textContent = user.status || 'unknown';
      row.append(identity, status);
      return row;
    });

    userDirectory.replaceChildren(...rows);
    setUserMessage(`${filteredUsers.length} of ${organizationUsers.length} user${organizationUsers.length === 1 ? '' : 's'}.`);
  };

  async function loadUsers() {
    if (!projectAccessToken || !projectOrganizationId) {
      organizationUsers = [];
      userDirectory.replaceChildren();
      setUserMessage('Sign in from Projects to load users.');
      return;
    }

    userRefreshButton.disabled = true;
    userDirectory.setAttribute('aria-busy', 'true');
    setUserMessage('Loading users…');
    try {
      const result = await requestProjectApi(
        `/api/organizations/${encodeURIComponent(projectOrganizationId)}/users`
      );
      organizationUsers = result.users || [];
      renderUsers();
    } catch (error) {
      organizationUsers = [];
      userDirectory.replaceChildren();
      setUserMessage(error.message || 'Users could not be loaded.', true);
    } finally {
      userDirectory.setAttribute('aria-busy', 'false');
      userRefreshButton.disabled = !projectAccessToken;
    }
  }

  const renderDataSources = () => {
    if (!organizationDataSources.length) {
      dataSourceDirectory.replaceChildren();
      setDataSourceMessage('No data sources are registered for this organization.');
      return;
    }

    const cards = organizationDataSources.map((source) => {
      const card = document.createElement('article');
      card.className = 'mini-card reusable-card data-source-card';

      const name = document.createElement('h3');
      name.textContent = source.name || 'Unnamed source';
      const type = document.createElement('p');
      type.className = 'data-source-type';
      type.textContent = source.source_type || 'Unknown type';
      const description = document.createElement('p');
      description.textContent = source.description || 'No description provided.';

      const metadata = document.createElement('div');
      metadata.className = 'data-source-meta';
      const status = document.createElement('span');
      const normalizedStatus = (source.status || 'unknown').toLowerCase();
      status.className = `badge ${['active', 'connected', 'ready'].includes(normalizedStatus) ? 'success' : normalizedStatus === 'error' ? 'danger' : 'neutral'}`;
      status.textContent = source.status || 'Unknown';
      const enabled = document.createElement('span');
      enabled.textContent = source.enabled ? 'Enabled' : 'Disabled';
      metadata.append(status, enabled);

      const actions = document.createElement('div');
      actions.className = 'data-source-actions';
      const testButton = document.createElement('button');
      testButton.className = 'button button-secondary';
      testButton.type = 'button';
      testButton.textContent = 'Test connection';
      const testMessage = document.createElement('p');
      testMessage.className = 'data-source-test-message';
      testMessage.setAttribute('role', 'status');

      testButton.addEventListener('click', async () => {
        testButton.disabled = true;
        testButton.textContent = 'Testing…';
        testMessage.textContent = '';
        try {
          const result = await requestProjectApi(
            `/api/data-sources/${encodeURIComponent(source.id)}/test`,
            { method: 'POST' }
          );
          testMessage.textContent = result.data?.message || result.message || 'Connection test completed.';
          testMessage.classList.toggle('is-pending', result.data?.status === 'not_implemented');
        } catch (error) {
          testMessage.textContent = error.message || 'Connection test failed.';
          testMessage.classList.remove('is-pending');
        } finally {
          testButton.disabled = false;
          testButton.textContent = 'Test connection';
        }
      });

      actions.append(testButton, testMessage);
      card.append(name, type, description, metadata, actions);
      return card;
    });

    dataSourceDirectory.replaceChildren(...cards);
    setDataSourceMessage(`${organizationDataSources.length} data source${organizationDataSources.length === 1 ? '' : 's'} loaded.`);
  };

  async function loadDataSources() {
    if (!projectAccessToken || !projectOrganizationId) {
      organizationDataSources = [];
      dataSourceDirectory.replaceChildren();
      setDataSourceMessage('Sign in from Projects to load data sources.');
      return;
    }

    dataSourceRefreshButton.disabled = true;
    dataSourceDirectory.setAttribute('aria-busy', 'true');
    setDataSourceMessage('Loading data sources…');
    try {
      const result = await requestProjectApi(
        `/api/organizations/${encodeURIComponent(projectOrganizationId)}/data-sources`
      );
      organizationDataSources = result.data?.data_sources || [];
      renderDataSources();
    } catch (error) {
      organizationDataSources = [];
      dataSourceDirectory.replaceChildren();
      setDataSourceMessage(error.message || 'Data sources could not be loaded.', true);
    } finally {
      dataSourceDirectory.setAttribute('aria-busy', 'false');
      dataSourceRefreshButton.disabled = !projectAccessToken;
    }
  }

  const renderRagDocuments = () => {
    if (!ragDocuments.length) {
      ragDocumentList.replaceChildren();
      setRagMessage('No documents are registered for this organization.');
      return;
    }

    const cards = ragDocuments.map((ragDocument) => {
      const card = document.createElement('article');
      card.className = 'mini-card reusable-card rag-document-card';

      const name = document.createElement('h3');
      name.textContent = ragDocument.original_filename || ragDocument.filename || 'Untitled document';
      const standard = document.createElement('p');
      standard.textContent = [ragDocument.standard, ragDocument.version].filter(Boolean).join(' · ') || 'Standard not identified';

      const metadata = document.createElement('div');
      metadata.className = 'rag-document-meta';
      const details = document.createElement('span');
      details.textContent = `${ragDocument.pages || 0} pages · ${ragDocument.chunks || 0} chunks`;
      const status = document.createElement('span');
      const normalizedStatus = (ragDocument.status || 'unknown').toLowerCase();
      status.className = `badge ${normalizedStatus === 'indexed' ? 'success' : normalizedStatus === 'failed' ? 'danger' : 'neutral'}`;
      status.textContent = ragDocument.status || 'Unknown';
      metadata.append(details, status);

      const remove = document.createElement('button');
      remove.className = 'button button-secondary rag-delete-button';
      remove.type = 'button';
      remove.textContent = 'Remove';
      remove.addEventListener('click', async () => {
        if (!window.confirm(`Remove ${name.textContent}?`)) {
          return;
        }
        remove.disabled = true;
        try {
          await requestProjectApi(
            `/api/organizations/${encodeURIComponent(projectOrganizationId)}/rag/documents/${encodeURIComponent(ragDocument.id)}`,
            { method: 'DELETE' }
          );
          await loadRagDocuments();
        } catch (error) {
          setRagMessage(error.message || 'The document could not be removed.', true);
          remove.disabled = false;
        }
      });

      card.append(name, standard, metadata, remove);
      return card;
    });

    ragDocumentList.replaceChildren(...cards);
    setRagMessage(`${ragDocuments.length} document${ragDocuments.length === 1 ? '' : 's'} loaded.`);
  };

  async function loadRagDocuments() {
    if (!projectAccessToken || !projectOrganizationId) {
      ragDocuments = [];
      ragDocumentList.replaceChildren();
      setRagMessage('Sign in from Projects to load organization documents.');
      return;
    }

    ragRefreshButton.disabled = true;
    ragDocumentList.setAttribute('aria-busy', 'true');
    setRagMessage('Loading documents…');
    try {
      const result = await requestProjectApi(
        `/api/organizations/${encodeURIComponent(projectOrganizationId)}/rag/documents`
      );
      ragDocuments = Array.isArray(result) ? result : [];
      renderRagDocuments();
    } catch (error) {
      ragDocuments = [];
      ragDocumentList.replaceChildren();
      setRagMessage(error.message || 'Documents could not be loaded.', true);
    } finally {
      ragDocumentList.setAttribute('aria-busy', 'false');
      ragRefreshButton.disabled = !projectAccessToken;
    }
  }

  const renderMlModels = (models) => {
    const entries = Object.entries(models || {});
    if (!entries.length) {
      mlModelStatus.replaceChildren();
      return;
    }

    const rows = entries.map(([name, model]) => {
      const row = document.createElement('div');
      row.className = 'ml-model-row';
      const details = document.createElement('div');
      const title = document.createElement('strong');
      title.textContent = name.replaceAll('_', ' ');
      const modelFile = document.createElement('span');
      modelFile.textContent = `${model.feature_count || 0} features · ${model.model_file || 'Model file not reported'}`;
      details.append(title, modelFile);
      const status = document.createElement('span');
      status.className = `badge ${model.loaded ? 'success' : 'neutral'}`;
      status.textContent = model.loaded ? 'Loaded' : 'Unavailable';
      row.append(details, status);
      return row;
    });

    mlModelStatus.replaceChildren(...rows);
  };

  async function loadRiskMlStatus() {
    mlRefreshButton.disabled = true;
    mlModelStatus.setAttribute('aria-busy', 'true');
    mlModelSchema.textContent = 'Loading model features…';
    setMlPageMessage('Loading model status…');
    const statusResult = await Promise.allSettled([
      requestMlApi('/api/ml-models/status'),
    ]).then((results) => results[0]);

    if (statusResult.status === 'fulfilled') {
      const models = statusResult.value.models || {};
      renderMlModels(models);
      const schemas = Object.fromEntries(
        Object.entries(models).map(([name, model]) => [name, {
          feature_count: model.feature_count || 0,
          features: model.features || [],
        }])
      );
      mlModelSchema.textContent = JSON.stringify(schemas, null, 2);
      setMlPageMessage('Model status loaded.');
    } else {
      renderMlModels({});
      mlModelSchema.textContent = statusResult.reason.message || 'Model features are unavailable.';
      setMlPageMessage(statusResult.reason.message || 'Model status is unavailable.', true);
    }

    mlModelStatus.setAttribute('aria-busy', 'false');
    mlRefreshButton.disabled = false;
  }

  const getMlInput = () => {
    const data = JSON.parse(mlEventData.value || '{}');
    const context = JSON.parse(mlContextData.value || '{}');
    if (!data || Array.isArray(data) || typeof data !== 'object') {
      throw new Error('Event data must be a JSON object.');
    }
    if (!context || Array.isArray(context) || typeof context !== 'object') {
      throw new Error('Context must be a JSON object.');
    }
    return { source: mlSourceSelect.value, data, context };
  };

  async function runMlAction(action) {
    let input;
    try {
      input = getMlInput();
      if (action === 'prepare' && !projectOrganizationId) {
        throw new Error('Sign in from Projects to prepare data for an organization.');
      }
    } catch (error) {
      setMlPageMessage(error.message, true);
      return;
    }

    mlPrepareButton.disabled = true;
    mlRunButton.disabled = true;
    mlActionMessage.textContent = action === 'prepare' ? 'Preparing input data…' : 'Running risk evaluation…';
    mlActionMessage.classList.remove('is-error');
    mlResultPanel.hidden = true;

    try {
      const url = action === 'prepare'
        ? '/api/ml-data-preparation/prepare'
        : '/api/risk-engine/evaluate';
      const body = action === 'prepare'
        ? { organization_id: projectOrganizationId, ...input }
        : input;
      const result = await requestMlApi(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      mlResultTitle.textContent = action === 'prepare' ? 'Prepared features' : 'Risk evaluation';
      mlResultOutput.textContent = JSON.stringify(result, null, 2);
      mlResultPanel.hidden = false;
      mlActionMessage.textContent = 'Request completed successfully.';
      setMlPageMessage('Analysis completed.');
    } catch (error) {
      mlActionMessage.textContent = error.message || 'The analysis request failed.';
      mlActionMessage.classList.add('is-error');
      setMlPageMessage('The API could not complete this analysis.', true);
    } finally {
      mlPrepareButton.disabled = !projectOrganizationId;
      mlRunButton.disabled = false;
    }
  }

  async function loadProjectTeams() {
    const result = await requestProjectApi(
      `/api/teams/organizations/${encodeURIComponent(projectOrganizationId)}/teams`
    );
    const teams = result.data?.teams || [];
    projectTeamSelect.replaceChildren(new Option('Choose a team', ''));
    teams.forEach((team) => {
      projectTeamSelect.add(new Option(team.name, team.team_id));
    });
    projectTeamSelect.disabled = teams.length === 0;
    projectCreateSubmit.disabled = teams.length === 0;
    if (!teams.length) {
      throw new Error('Create a team before creating a project.');
    }
  }

  const renderOrganizations = (records) => {
    const query = organizationSearch.value.trim().toLocaleLowerCase();
    const filtered = records.filter((organization) => {
      const searchable = [organization.name, organization.domain, organization.status]
        .filter(Boolean)
        .join(' ')
        .toLocaleLowerCase();
      return searchable.includes(query);
    });

    if (!filtered.length) {
      setOrganizationMessage(records.length ? 'No organizations match this filter.' : 'No organizations have been returned.');
      return;
    }

    const rows = filtered.map((organization) => {
      const row = document.createElement('article');
      row.className = 'home-org-row';

      const identity = document.createElement('div');
      identity.className = 'home-org-identity';
      const mark = document.createElement('span');
      mark.className = 'home-org-mark';
      mark.setAttribute('aria-hidden', 'true');
      mark.textContent = (organization.name || '?').trim().slice(0, 1).toLocaleUpperCase();

      const name = document.createElement('strong');
      name.textContent = organization.name || 'Unnamed organization';
      const domain = document.createElement('span');
      domain.textContent = organization.domain || organization.id || 'Domain not provided';
      identity.append(mark, document.createElement('span'));
      identity.lastElementChild.append(name, domain);

      const status = document.createElement('span');
      status.className = 'badge neutral';
      status.textContent = organization.status || 'Status not provided';
      row.append(identity, status);
      return row;
    });

    organizationList.replaceChildren(...rows);
    organizationList.setAttribute('role', 'list');
  };

  const setOrganizationPageMessage = (message, isError = false, canRetry = false) => {
    const text = document.createElement('p');
    text.textContent = message;
    organizationPageMessage.className = `organization-page-message${isError ? ' is-error' : ''}`;
    organizationPageMessage.replaceChildren(text);
    organizationPageMessage.setAttribute('role', isError ? 'alert' : 'status');

    if (canRetry) {
      const retry = document.createElement('button');
      retry.className = 'button button-secondary';
      retry.type = 'button';
      retry.textContent = 'Retry';
      retry.addEventListener('click', loadHomeDashboard);
      organizationPageMessage.append(retry);
    }
  };

  const renderOrganizationDirectory = (records) => {
    const query = organizationPageSearch.value.trim().toLocaleLowerCase();
    const filtered = records.filter((organization) => {
      const status = organization.status || organization.verification_status;
      const searchable = [organization.name, organization.domain, organization.id, status]
        .filter(Boolean)
        .join(' ')
        .toLocaleLowerCase();
      return searchable.includes(query);
    });

    if (!filtered.length) {
      const empty = document.createElement('div');
      empty.className = 'organization-empty-state';
      const heading = document.createElement('strong');
      const detail = document.createElement('p');
      heading.textContent = records.length ? 'No matching organizations' : 'No organization records to show';
      detail.textContent = records.length
        ? 'Try a different name, domain, or identifier.'
        : 'Records returned by the organization API will appear here.';
      empty.append(heading, detail);
      organizationDirectory.replaceChildren(empty);
      organizationPageCount.textContent = organizationListFailed
        ? createdOrganizationRecords.length ? `${createdOrganizationRecords.length} created` : 'Unavailable'
        : '0 organizations';
      return;
    }

    const rows = filtered.map((organization) => {
      const row = document.createElement('article');
      row.className = 'organization-row';
      row.setAttribute('role', 'listitem');

      const identity = document.createElement('div');
      identity.className = 'organization-identity';
      const mark = document.createElement('span');
      mark.className = 'home-org-mark';
      mark.setAttribute('aria-hidden', 'true');
      mark.textContent = (organization.name || '?').trim().slice(0, 1).toLocaleUpperCase();
      const identityCopy = document.createElement('span');
      identityCopy.className = 'organization-identity-copy';
      const name = document.createElement('strong');
      name.textContent = organization.name || 'Unnamed organization';
      const id = document.createElement('code');
      id.textContent = organization.id || 'ID not provided';
      identityCopy.append(name, id);
      identity.append(mark, identityCopy);

      const domainCell = document.createElement('div');
      domainCell.className = 'organization-row-cell';
      const domainLabel = document.createElement('span');
      domainLabel.className = 'organization-mobile-label';
      domainLabel.textContent = 'Domain';
      const domain = document.createElement('span');
      domain.textContent = organization.domain || 'Not provided';
      domainCell.append(domainLabel, domain);

      const statusCell = document.createElement('div');
      statusCell.className = 'organization-row-cell';
      const statusLabel = document.createElement('span');
      statusLabel.className = 'organization-mobile-label';
      statusLabel.textContent = 'Status';
      const status = document.createElement('span');
      status.className = 'badge neutral';
      status.textContent = organization.status || organization.verification_status || 'Not provided';
      statusCell.append(statusLabel, status);

      row.append(identity, domainCell, statusCell);
      return row;
    });

    organizationDirectory.replaceChildren(...rows);
    organizationPageCount.textContent = organizationListFailed
      ? `${createdOrganizationRecords.length} created`
      : `${filtered.length}${filtered.length === records.length ? '' : ` of ${records.length}`} organizations`;
  };

  const updateHealth = (isHealthy, message) => {
    healthValue.textContent = isHealthy ? 'Available' : 'Unavailable';
    healthNote.textContent = message;
    healthDetail.textContent = isHealthy ? 'Health check responded successfully.' : message;
    sidebarHealthLabel.textContent = isHealthy ? 'Available' : 'Unavailable';
    sidebarHealthNote.textContent = message;
    sidebarHealthState.classList.toggle('success', isHealthy);
    sidebarHealthState.classList.toggle('danger', !isHealthy);
    sidebarHealthState.classList.remove('neutral');
    healthIndicator.classList.toggle('is-healthy', isHealthy);
    healthIndicator.classList.toggle('is-unavailable', !isHealthy);
  };

  async function loadHomeDashboard() {
    if (!organizationList) {
      return;
    }

    refreshButton.disabled = true;
    organizationRefreshButton.disabled = true;
    organizationList.setAttribute('aria-busy', 'true');
    organizationDirectory.setAttribute('aria-busy', 'true');
    setOrganizationMessage('Loading organizations…');
    setOrganizationPageMessage('Loading organizations…');
    organizationPageCount.textContent = 'Loading';
    healthValue.textContent = 'Checking';
    healthNote.textContent = 'Requesting the health endpoint';
    healthDetail.textContent = 'Waiting for health check';
    healthIndicator.classList.remove('is-healthy', 'is-unavailable');
    healthIndicator.classList.add('is-pending');

    const [healthResult, organizationsResult] = await Promise.allSettled([
      fetch('/health').then(async (response) => {
        if (!response.ok) {
          throw new Error(`Health check returned ${response.status}`);
        }
        return response.json();
      }),
      fetch('/api/organizations').then(async (response) => {
        if (!response.ok) {
          throw new Error(`Organization request returned ${response.status}`);
        }
        return response.json();
      }),
    ]);

    if (healthResult.status === 'fulfilled' && healthResult.value.success === true) {
      updateHealth(true, 'Health check responded successfully.');
    } else {
      updateHealth(false, 'The health check could not be completed.');
    }
    healthIndicator.classList.remove('is-pending');

    if (organizationsResult.status === 'fulfilled' && Array.isArray(organizationsResult.value.organizations)) {
      organizationListFailed = false;
      organizations = organizationsResult.value.organizations;
      organizationPageRecords = organizations;
      organizationCount.textContent = String(organizations.length);
      renderOrganizations(organizations);
      renderOrganizationDirectory(organizationPageRecords);
      setOrganizationPageMessage(organizations.length ? 'Directory records loaded from the API.' : 'The API returned no organizations.');
    } else {
      organizationListFailed = true;
      organizationCount.textContent = 'Unavailable';
      organizations = [];
      organizationPageRecords = createdOrganizationRecords;
      setOrganizationMessage('Organization records could not be loaded from the API.', true);
      setOrganizationPageMessage(
        'The organization directory could not be loaded from the API.',
        true,
        true
      );
      renderOrganizationDirectory(organizationPageRecords);
    }

    organizationList.setAttribute('aria-busy', 'false');
    organizationDirectory.setAttribute('aria-busy', 'false');
    refreshButton.disabled = false;
    organizationRefreshButton.disabled = false;
  }

  const closeOrganizationDialog = () => organizationDialog.close();

  organizationCreateOpen.addEventListener('click', () => {
    organizationFormMessage.textContent = '';
    organizationFormMessage.classList.remove('is-error');
    organizationFormMessage.setAttribute('role', 'status');
    organizationDialog.showModal();
    document.querySelector('#organization-name').focus();
  });

  organizationCreateCancel.addEventListener('click', closeOrganizationDialog);
  organizationDialogClose.addEventListener('click', closeOrganizationDialog);
  organizationRefreshButton.addEventListener('click', loadHomeDashboard);
  organizationPageSearch.addEventListener('input', () => renderOrganizationDirectory(organizationPageRecords));

  organizationCreateForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    organizationCreateSubmit.disabled = true;
    organizationCreateSubmit.textContent = 'Creating…';
    organizationFormMessage.textContent = '';
    organizationFormMessage.classList.remove('is-error');
    organizationFormMessage.setAttribute('role', 'status');

    const formData = new FormData(organizationCreateForm);
    try {
      const response = await fetch('/api/organizations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.get('name').trim(),
          domain: formData.get('domain').trim(),
        }),
      });

      if (!response.ok) {
        throw new Error('The organization service did not accept the request.');
      }

      const result = await response.json();
      if (result.success !== true || !result.id || !result.name) {
        throw new Error('The organization service returned an incomplete response.');
      }

      const createdOrganization = {
        id: result.id,
        name: result.name,
        domain: result.domain,
      };
      createdOrganizationRecords = [createdOrganization, ...createdOrganizationRecords];

      if (organizationListFailed) {
        organizationPageRecords = createdOrganizationRecords;
        setOrganizationPageMessage(
          'Organization created. The full directory is unavailable; showing records created in this session.'
        );
      } else {
        organizations = [...organizations, createdOrganization];
        organizationPageRecords = organizations;
        organizationCount.textContent = String(organizations.length);
        renderOrganizations(organizations);
        setOrganizationPageMessage(`${createdOrganization.name} was created.`);
      }

      renderOrganizationDirectory(organizationPageRecords);
      organizationCreateForm.reset();
      organizationDialog.close();
    } catch {
      organizationFormMessage.textContent = 'The organization could not be created. The server did not confirm the request.';
      organizationFormMessage.classList.add('is-error');
      organizationFormMessage.setAttribute('role', 'alert');
    } finally {
      organizationCreateSubmit.disabled = false;
      organizationCreateSubmit.textContent = 'Create organization';
    }
  });

  projectLoginForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    projectLoginSubmit.disabled = true;
    setProjectMessage('Signing in…');
    const formData = new FormData(projectLoginForm);
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          username: formData.get('email').trim(),
          password: formData.get('password'),
        }),
      });
      const result = await response.json();
      if (!response.ok || !result.data?.access_token || !result.data?.organization_id) {
        throw new Error(result.detail || 'Sign in failed. Check your credentials and try again.');
      }

      projectAccessToken = result.data.access_token;
      projectOrganizationId = result.data.organization_id;
      sessionStorage.setItem('projectAccessToken', projectAccessToken);
      sessionStorage.setItem('projectOrganizationId', projectOrganizationId);
      updateProjectAuthControls();
      projectLoginForm.reset();
      await loadProjectOrganizations();
    } catch (error) {
      setProjectMessage(error.message || 'Sign in failed.', true);
    } finally {
      projectLoginSubmit.disabled = false;
    }
  });

  projectLogoutButton.addEventListener('click', () => {
    projectAccessToken = '';
    projectOrganizationId = '';
    sessionStorage.removeItem('projectAccessToken');
    sessionStorage.removeItem('projectOrganizationId');
    projectOrganizationSelect.replaceChildren(new Option('Sign in to select an organization', ''));
    projectDirectory.replaceChildren();
    updateProjectAuthControls();
    setProjectMessage('Signed out. Sign in to load projects.');
    teamDirectory.replaceChildren();
    setTeamMessage('Sign in from Projects to load teams.');
    organizationUsers = [];
    userDirectory.replaceChildren();
    setUserMessage('Sign in from Projects to load users.');
    organizationDataSources = [];
    dataSourceDirectory.replaceChildren();
    setDataSourceMessage('Sign in from Projects to load data sources.');
    ragDocuments = [];
    ragDocumentList.replaceChildren();
    ragAnswer.hidden = true;
    setRagMessage('Sign in to load documents.');
  });

  projectRefreshButton.addEventListener('click', loadProjects);
  projectCreateOpen.addEventListener('click', async () => {
    projectFormMessage.textContent = '';
    projectFormMessage.classList.remove('is-error');
    try {
      await loadProjectTeams();
      projectDialog.showModal();
      document.querySelector('#project-name').focus();
    } catch (error) {
      setProjectMessage(error.message || 'Teams could not be loaded.', true);
    }
  });

  const closeProjectDialog = () => projectDialog.close();
  document.querySelector('#project-create-cancel').addEventListener('click', closeProjectDialog);
  document.querySelector('#project-dialog-close').addEventListener('click', closeProjectDialog);

  projectCreateForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    projectCreateSubmit.disabled = true;
    projectCreateSubmit.textContent = 'Creating…';
    projectFormMessage.textContent = '';
    projectFormMessage.classList.remove('is-error');
    const formData = new FormData(projectCreateForm);
    try {
      await requestProjectApi(
        `/api/projects/organizations/${encodeURIComponent(projectOrganizationId)}/projects`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: formData.get('name').trim(),
            description: formData.get('description').trim() || null,
            team_id: formData.get('team_id'),
          }),
        }
      );
      projectCreateForm.reset();
      closeProjectDialog();
      await loadProjects();
    } catch (error) {
      projectFormMessage.textContent = error.message || 'The project could not be created.';
      projectFormMessage.classList.add('is-error');
      projectFormMessage.setAttribute('role', 'alert');
    } finally {
      projectCreateSubmit.disabled = !projectTeamSelect.value;
      projectCreateSubmit.textContent = 'Create project';
    }
  });

  teamRefreshButton.addEventListener('click', loadTeams);
  teamCreateOpen.addEventListener('click', () => {
    teamFormMessage.textContent = '';
    teamFormMessage.classList.remove('is-error');
    teamDialog.showModal();
    document.querySelector('#team-name').focus();
  });

  const closeTeamDialog = () => teamDialog.close();
  document.querySelector('#team-create-cancel').addEventListener('click', closeTeamDialog);
  document.querySelector('#team-dialog-close').addEventListener('click', closeTeamDialog);

  teamCreateForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    teamCreateSubmit.disabled = true;
    teamCreateSubmit.textContent = 'Adding…';
    teamFormMessage.textContent = '';
    teamFormMessage.classList.remove('is-error');
    const formData = new FormData(teamCreateForm);
    try {
      await requestProjectApi(
        `/api/teams/organizations/${encodeURIComponent(projectOrganizationId)}/teams`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: formData.get('name').trim(),
            description: formData.get('description').trim() || null,
          }),
        }
      );
      teamCreateForm.reset();
      closeTeamDialog();
      await loadTeams();
    } catch (error) {
      teamFormMessage.textContent = error.message || 'The team could not be created.';
      teamFormMessage.classList.add('is-error');
      teamFormMessage.setAttribute('role', 'alert');
    } finally {
      teamCreateSubmit.disabled = false;
      teamCreateSubmit.textContent = 'Add team';
    }
  });

  userRefreshButton.addEventListener('click', loadUsers);
  userSearch.addEventListener('input', renderUsers);
  userInviteOpen.addEventListener('click', () => {
    userFormMessage.textContent = '';
    userFormMessage.classList.remove('is-error');
    userDialog.showModal();
    document.querySelector('#invite-user-name').focus();
  });

  const closeUserDialog = () => userDialog.close();
  document.querySelector('#user-invite-cancel').addEventListener('click', closeUserDialog);
  document.querySelector('#user-dialog-close').addEventListener('click', closeUserDialog);

  userInviteForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    userInviteSubmit.disabled = true;
    userInviteSubmit.textContent = 'Sending…';
    userFormMessage.textContent = '';
    userFormMessage.classList.remove('is-error');
    const formData = new FormData(userInviteForm);
    try {
      const result = await requestProjectApi(
        `/api/organizations/${encodeURIComponent(projectOrganizationId)}/users`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: formData.get('name').trim(),
            email: formData.get('email').trim(),
          }),
        }
      );
      userInviteForm.reset();
      closeUserDialog();
      await loadUsers();
      setUserMessage(result.message || 'User invited successfully.');
    } catch (error) {
      userFormMessage.textContent = error.message || 'The invitation could not be sent.';
      userFormMessage.classList.add('is-error');
      userFormMessage.setAttribute('role', 'alert');
    } finally {
      userInviteSubmit.disabled = false;
      userInviteSubmit.textContent = 'Send invite';
    }
  });

  dataSourceRefreshButton.addEventListener('click', loadDataSources);
  dataSourceCreateOpen.addEventListener('click', () => {
    dataSourceFormMessage.textContent = '';
    dataSourceFormMessage.classList.remove('is-error');
    dataSourceDialog.showModal();
    document.querySelector('#data-source-name').focus();
  });

  const closeDataSourceDialog = () => dataSourceDialog.close();
  document.querySelector('#data-source-create-cancel').addEventListener('click', closeDataSourceDialog);
  document.querySelector('#data-source-dialog-close').addEventListener('click', closeDataSourceDialog);

  dataSourceCreateForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    dataSourceCreateSubmit.disabled = true;
    dataSourceCreateSubmit.textContent = 'Connecting…';
    dataSourceFormMessage.textContent = '';
    dataSourceFormMessage.classList.remove('is-error');
    const formData = new FormData(dataSourceCreateForm);
    const configText = formData.get('connection_config').trim();
    let connectionConfig = null;
    try {
      if (configText) {
        connectionConfig = JSON.parse(configText);
        if (!connectionConfig || Array.isArray(connectionConfig) || typeof connectionConfig !== 'object') {
          throw new Error('Connection config must be a JSON object.');
        }
      }

      await requestProjectApi(
        `/api/organizations/${encodeURIComponent(projectOrganizationId)}/data-sources`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: formData.get('name').trim(),
            source_type: formData.get('source_type'),
            description: formData.get('description').trim() || null,
            connection_config: connectionConfig,
          }),
        }
      );
      dataSourceCreateForm.reset();
      closeDataSourceDialog();
      await loadDataSources();
    } catch (error) {
      dataSourceFormMessage.textContent = error.message || 'The data source could not be connected.';
      dataSourceFormMessage.classList.add('is-error');
      dataSourceFormMessage.setAttribute('role', 'alert');
    } finally {
      dataSourceCreateSubmit.disabled = false;
      dataSourceCreateSubmit.textContent = 'Connect source';
    }
  });

  ragRefreshButton.addEventListener('click', loadRagDocuments);

  ragUploadForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const file = ragFileInput.files[0];
    if (!file) {
      ragUploadMessage.textContent = 'Choose a PDF file to upload.';
      return;
    }

    ragUploadSubmit.disabled = true;
    ragUploadSubmit.textContent = 'Uploading…';
    ragUploadMessage.textContent = '';
    ragUploadMessage.classList.remove('is-error');
    try {
      const formData = new FormData();
      formData.append('file', file);
      const result = await requestProjectApi(
        `/api/organizations/${encodeURIComponent(projectOrganizationId)}/rag/documents`,
        { method: 'POST', body: formData }
      );
      ragUploadMessage.textContent = `Uploaded ${result.original_filename || file.name}.`;
      ragUploadForm.reset();
      await loadRagDocuments();
    } catch (error) {
      ragUploadMessage.textContent = error.message || 'The document could not be uploaded.';
      ragUploadMessage.classList.add('is-error');
      ragUploadMessage.setAttribute('role', 'alert');
    } finally {
      ragUploadSubmit.disabled = !projectAccessToken;
      ragUploadSubmit.textContent = 'Upload document';
    }
  });

  ragQueryForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    ragQuerySubmit.disabled = true;
    ragQuerySubmit.textContent = 'Searching…';
    ragQueryMessage.textContent = '';
    ragQueryMessage.classList.remove('is-error');
    ragAnswer.hidden = true;
    const formData = new FormData(ragQueryForm);
    try {
      const result = await requestProjectApi(
        `/api/organizations/${encodeURIComponent(projectOrganizationId)}/rag/query`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            question: formData.get('question').trim(),
            top_k: Number(formData.get('top_k')) || 5,
          }),
        }
      );
      ragAnswerText.textContent = result.answer || 'No answer was returned.';
      ragRecommendation.textContent = result.recommendation || '';
      const resultItems = Array.isArray(result.results) ? result.results : [];
      ragResults.replaceChildren(...resultItems.map((item) => {
        const entry = document.createElement('p');
        entry.textContent = item.text || item.content || item.metadata?.source || 'Retrieved document excerpt';
        return entry;
      }));
      ragAnswer.hidden = false;
    } catch (error) {
      ragQueryMessage.textContent = error.message || 'The document query failed.';
      ragQueryMessage.classList.add('is-error');
      ragQueryMessage.setAttribute('role', 'alert');
    } finally {
      ragQuerySubmit.disabled = !projectAccessToken;
      ragQuerySubmit.textContent = 'Ask';
    }
  });

  mlRefreshButton.addEventListener('click', loadRiskMlStatus);
  mlPrepareButton.addEventListener('click', () => runMlAction('prepare'));
  mlRunButton.addEventListener('click', () => runMlAction('evaluate'));

  document.addEventListener('click', (event) => {
    const link = event.target.closest('a[href^="#"]');
    if (!link) {
      return;
    }

    const targetHash = link.getAttribute('href');
    const targetId = targetHash.slice(1);
    if (!targetId || !pageTitles[targetId] || !document.getElementById(targetId)) {
      return;
    }

    event.preventDefault();
    setActiveSection(targetId);
    history.replaceState(null, '', targetHash);
    if (targetId === 'risk-analysis') {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
    if (targetId === 'teams') {
      loadTeams();
    } else if (targetId === 'users') {
      loadUsers();
    } else if (targetId === 'data-sources') {
      loadDataSources();
    } else if (targetId === 'rag') {
      loadRagDocuments();
    } else if (targetId === 'risk-analysis') {
      loadRiskMlStatus();
    }
  });

  const initialHash = window.location.hash.slice(1);
  const initialSection = initialHash && document.getElementById(initialHash) ? initialHash : 'dashboard';
  setActiveSection(initialSection);
  if (initialHash && initialSection === 'risk-analysis') {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }
  if (initialSection === 'teams') {
    loadTeams();
  } else if (initialSection === 'users') {
    loadUsers();
  } else if (initialSection === 'data-sources') {
    loadDataSources();
  } else if (initialSection === 'rag') {
    loadRagDocuments();
  } else if (initialSection === 'risk-analysis') {
    loadRiskMlStatus();
  }

  const searchInput = document.querySelector('.search-box input');
  if (searchInput) {
    searchInput.addEventListener('input', () => renderOrganizations(organizations));
  }

  refreshButton.addEventListener('click', loadHomeDashboard);
  loadHomeDashboard();
  updateProjectAuthControls();
  if (projectAccessToken && projectOrganizationId) {
    loadProjectOrganizations().catch((error) => {
      setProjectMessage(error.message || 'Projects could not be loaded.', true);
    });
  }
});
