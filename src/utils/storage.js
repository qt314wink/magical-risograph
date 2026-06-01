const PROJECTS_KEY = 'magRisoProjects';
const DRAFT_KEY = 'magRisoDraft';
const SCHEMA_VERSION = 1;

function generateId() {
  return 'QP-' + Math.random().toString(36).slice(2, 8).toUpperCase();
}

function nowDate() {
  return new Date().toISOString().slice(0, 10);
}

export class ProjectArchive {
  getAll() {
    try {
      const raw = localStorage.getItem(PROJECTS_KEY);
      if (!raw) return [];
      const data = JSON.parse(raw);
      if (!Array.isArray(data)) return [];
      return data;
    } catch (e) {
      return [];
    }
  }

  save(project) {
    const projects = this.getAll();
    const entry = {
      id: project.id || generateId(),
      title: project.title || 'UNTITLED PROJECT',
      type: project.type || 'UNKNOWN',
      colors: project.colors || ['#FF4B5C', '#00D2D3'],
      layers: project.layers || 2,
      status: project.status || 'COMPLETE',
      date: project.date || nowDate(),
      config: project.config || {},
      createdAt: Date.now(),
      _v: SCHEMA_VERSION,
    };
    // Update if exists
    const idx = projects.findIndex(p => p.id === entry.id);
    if (idx > -1) {
      projects[idx] = entry;
    } else {
      projects.unshift(entry);
    }
    localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects));
    return entry.id;
  }

  delete(id) {
    const projects = this.getAll().filter(p => p.id !== id);
    localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects));
  }

  getById(id) {
    return this.getAll().find(p => p.id === id);
  }

  getDraft() {
    try {
      const raw = localStorage.getItem(DRAFT_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  }

  saveDraft(draft) {
    localStorage.setItem(DRAFT_KEY, JSON.stringify({ ...draft, savedAt: Date.now() }));
  }

  clearDraft() {
    localStorage.removeItem(DRAFT_KEY);
  }
}

export function initStorage() {
  if (!window.projectArchive) {
    window.projectArchive = new ProjectArchive();
  }
}
