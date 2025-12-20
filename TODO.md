# WAFLens TODO

> **Last Updated:** 2025-12-20  
> **Cloud Focus:** Azure (primary), multi-cloud planned

---

## ✅ Completed

### Phase 1: Critical Fixes

- [x] Replace DataConnect schema (was using movie template)
- [x] Fix Firestore security rules (expired timestamp)
- [x] Implement all 5 pillar pages
- [x] Fix navigation placeholder links
- [x] Add error handling to `ActionItemsTable`
- [x] Create custom hooks (`useFirestoreQuery`, `useWAFPillars`)
- [x] Create Python backend structure
- [x] Update README and TODO documentation

---

## 🔴 Critical (Next Sprint)

### Azure Integration

- [ ] Set up Azure Service Principal for API access
- [ ] Implement Azure Advisor API client in backend
- [ ] Create `/api/v1/azure/advisor` endpoint
- [ ] Sync Azure recommendations to Firestore

### n8n Workflows (Self-Hosted VPS)

- [ ] Create `n8n/daily-azure-sync.json` workflow
- [ ] Create `n8n/ai-recommendation-pipeline.json` workflow
- [ ] Create `n8n/github-issue-automation.json` workflow
- [ ] Document n8n setup and import instructions

### Buildship Flows

- [ ] Document assessment scoring flow spec
- [ ] Document cloud resource scanner flow spec
- [ ] Create Buildship integration guide

---

## 🟠 High Priority

### Code Quality

- [ ] Replace `any` types in `order-card.tsx`
- [ ] Replace `any` types in `framework-adoption-chart.tsx`
- [ ] Create `useAssessment` hook
- [ ] Add real-time Firestore listeners

### AI Integration

- [ ] Implement multi-model router (Gemini/OpenAI/Claude/Perplexity)
- [ ] Create AI chat component in frontend
- [ ] Add AI recommendations panel to pillar pages

### Authentication

- [ ] Add role-based access (admin, user, viewer)
- [ ] Implement custom claims in Firebase Auth
- [ ] Add organization/team support

---

## 🟡 Medium Priority

### UI/UX

- [ ] Add dark mode toggle
- [ ] Replace inline SVG favicon with proper asset
- [ ] Add pagination to tables
- [ ] Improve mobile responsiveness
- [ ] Add skeleton loading states

### Testing

- [ ] Set up Playwright E2E tests
- [ ] Add Firestore security rules unit tests
- [ ] Create GitHub Actions test workflow
- [ ] Add backend API tests (pytest)

### Frontend-Backend Integration

- [ ] Connect pillar pages to backend API
- [ ] Replace hardcoded chart data with API calls
- [ ] Implement assessment questionnaire flow

---

## 🟢 Nice to Have

- [ ] Export assessments to PDF
- [ ] Multi-language support (i18n)
- [ ] Team collaboration features
- [ ] Slack/Teams notification integration
- [ ] Assessment comparison view
- [ ] Historical score trending charts
- [ ] GCP Recommender integration
- [ ] AWS Trusted Advisor integration

---

## 📋 GitHub Issues Reference

The following issues should be created in GitHub:

### Critical

1. `[CRITICAL] DataConnect schema uses wrong template` ✅ Fixed
2. `[CRITICAL] ActionItemsTable crashes on Firestore errors` ✅ Fixed
3. `[CRITICAL] Implement Azure Advisor API integration`
4. `[CRITICAL] Create n8n workflow JSON exports`

### High

5. `[HIGH] TypeScript any types in chart components`
6. `[HIGH] No custom data fetching hooks` ✅ Partially fixed
7. `[HIGH] Implement multi-model AI router`
8. `[HIGH] Add role-based access control`

### Medium

9. `[MEDIUM] Add dark mode toggle`
10. `[MEDIUM] Add pagination to tables`
11. `[MEDIUM] Set up E2E testing with Playwright`
12. `[MEDIUM] Create Buildship flow documentation`

---

## Notes

- **n8n**: Self-hosted on VPS, workflows exported as JSON
- **Buildship**: Cloud account active, used for assessment scoring
- **Azure**: Primary cloud, using Advisor API for recommendations
- **AI**: Multi-model approach (Gemini for speed, GPT-4 for code, Claude for docs)
