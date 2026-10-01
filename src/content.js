// All site copy lives here so it can be edited without touching layout code.

export const person = {
  name: 'Priyank Patel',
  roles: ['AI Engineer', 'Forward Deployed Engineer'],
  location: 'Ahmedabad, Gujarat, India',
  positioning:
    'I build production multi-agent systems for enterprise clients and deploy them alongside the executives who use them.',
  about: [
    'At SaarthiOS I build Right Hand, an AI chief of staff that is live with three clients. I’m in the final year of a B.E. in AI and ML at L.D. College of Engineering, and a code reviewer for Kubeflow.',
  ],
};

export const links = {
  email: 'priyank8445@gmail.com',
  github: 'https://github.com/priyank766',
  linkedin: 'https://www.linkedin.com/in/priyank766/',
  x: 'https://x.com/priyank766',
  site: 'https://priyank.is-a.dev',
};

// The five-second summary next to the intro.
export const glance = [
  { label: 'Now', lines: ['AI Product Engineer, SaarthiOS', 'Right Hand, live with 3 clients'] },
  { label: 'Open source', lines: ['Code Reviewer, kubeflow/mcp-server', 'Kubeflow organization member'] },
  { label: 'Education', lines: ['B.E. AI & ML, L.D. College of Engineering', '2023–2027 · CGPA 8.43'] },
];

export const now = {
  role: 'AI Product Engineer',
  company: 'SaarthiOS',
  companyUrl: 'https://saarthios.com',
  dates: 'Jun 2026 – present',
  place: 'Remote',
  project: 'Right Hand',
  dek: 'An AI chief of staff for executives.',
  summary:
    'Right Hand reads an executive’s inbox and tells them what needs their attention today. It is live with three clients, where promoters, CFOs, and CEOs use it. It runs as a multi-agent system on the Anthropic SDK and AWS Bedrock.',
  figures: [
    { fig: '3', cap: 'clients live' },
    { fig: '100+ → 5', cap: 'open situations narrowed to the ones that need action today' },
    { fig: '4,000+', cap: 'documents converted to source-linked Markdown' },
    { fig: '15 min', cap: 'mail sync interval, plus event triggers' },
  ],
  agents: [
    { name: 'Profiler', text: 'Learns how each executive works from their past mail.' },
    { name: 'Interpreter', text: 'Groups related emails into one situation.' },
    {
      name: 'Chief of Staff',
      text: 'Narrows 100+ open situations to the 5 that need action today. It recommends a next step for each in the executive’s usual tone, grounded first in how they handled similar cases before.',
    },
  ],
  pull: 'When the evidence runs out, it says it can’t tell. It does not guess.',
  details: [
    {
      heading: 'The first version',
      text: 'I started with a rule-based Context Graph that cited every answer to its source page and line. It degraded with the second client, because each new supplier needed new rules. The agent design that replaced it needs only configuration for a new client.',
    },
    {
      heading: 'Made for real mail',
      text: 'The agents’ tools are read-only and can see only one person’s data. Every run has hard limits on steps and cost. When the evidence runs out, the system says it can’t tell.',
    },
    {
      heading: 'Getting the mail in',
      text: 'An ingestion pipeline pulls mail from Microsoft Graph every 15 minutes and on event triggers. A Context Builder agent converts DOCX, PDF, CSV, XLSX, and PPTX files into Markdown that links back to the source, across corpora of more than 4,000 documents.',
    },
    {
      heading: 'In the field',
      text: 'I scope requirements directly with client executives. Recommendations reach them through the WhatsApp Business API, as text or as voice. I set up the second client’s infrastructure on GCP with Cloud Run, GCS, and Compute Engine. When the same issue keeps coming up in the field, I turn it into a product change.',
    },
  ],
  stack: ['Anthropic SDK', 'AWS Bedrock', 'Microsoft Graph', 'WhatsApp Business API', 'GCP'],
};

const pr = (repo, n) => ({ repo, n, url: `https://github.com/kubeflow/${repo}/pull/${n}` });

export const openSource = {
  org: 'Kubeflow',
  orgNote: 'CNCF',
  reviewerUrl: 'https://github.com/kubeflow/mcp-server/pull/288',
  memberUrl: 'https://github.com/kubeflow/internal-acls/pull/951',
  figure: { fig: '9', cap: 'pull requests across kubeflow/mcp-server and kubeflow/sdk' },
  themes: [
    {
      label: 'Safety and observability',
      items: [
        { text: 'Added OpenTelemetry tracing for tool calls', refs: [pr('mcp-server', 21)] },
        { text: 'Added a confirmation gate before a training job can be modified', refs: [pr('mcp-server', 198)] },
      ],
    },
    {
      label: 'Reliability',
      items: [
        { text: 'Capped memory use when streaming job logs', refs: [pr('mcp-server', 167)] },
        { text: 'Fixed runtime-metadata extraction', refs: [pr('mcp-server', 192)] },
        { text: 'Fixed pip permission detection on OpenShift', refs: [pr('mcp-server', 46)] },
        { text: 'Fixed trainer status never reaching TRAINJOB_COMPLETE', refs: [pr('sdk', 340)] },
        { text: 'Made dataset and model initializers run in parallel to shorten job startup', refs: [pr('sdk', 313)] },
      ],
    },
    {
      label: 'Testing and CI',
      items: [
        { text: 'Extended the Kubernetes E2E suite with negative-path and lifecycle scenarios', refs: [pr('mcp-server', 196)] },
        { text: 'Added CI that catches lockfile regressions', refs: [pr('mcp-server', 73)] },
      ],
    },
  ],
};

export const projects = [
  {
    name: 'Anchor',
    kind: 'MCP server',
    dek: 'Shared, persistent memory for coding agents.',
    figure: { fig: '44×', cap: 'context compression, with 100% of critical facts recovered' },
    url: 'https://anchormem.me',
    urlLabel: 'anchormem.me',
    body: [
      'Anchor gives Claude Code, Cursor, Cline, and Codex one shared memory of facts, decisions, and past work that lasts across sessions. It supersedes stale entries and redacts secrets before anything is written. It is published on npm.',
      'In reproducible evaluation suites it compressed context 44× with 100% critical-fact recovery across 8 scenarios. Recall takes under 4 ms at p50 with 10,000 memories stored.',
    ],
    stack: ['TypeScript', 'MCP', 'SQLite FTS5 / BM25', 'Node.js'],
  },
  {
    name: 'Hermes-BIO',
    kind: 'Agent harness',
    dek: 'An agentic harness for drug-discovery research.',
    figure: { fig: '6/6', cap: 'textbook targets recovered, and 4/4 defensible picks on harder diseases' },
    url: 'https://github.com/priyank766/Hermes-BIO',
    urlLabel: 'github.com/priyank766/Hermes-BIO',
    body: [
      'You give it a disease. It picks a target, lists druggable targets that few people have worked on, and finds approved drugs that bind the target but are approved for something else. A Gemini function-calling loop chains UniProt, OpenTargets, RCSB PDB, AlphaFold DB, and ChEMBL. It runs from a React UI, a CLI, or as an MCP server.',
      'It recovered the textbook target in 6 of 6 benchmark diseases at about 38 seconds per disease. On 4 harder diseases with no textbook answer, all 4 picks were defensible. Persistent memory makes a repeat run roughly 3× faster.',
    ],
    stack: ['FastAPI', 'Gemini function calling', 'FastMCP', 'RDKit', 'React', 'SQLite'],
  },
  {
    name: 'Recursive Language Models',
    kind: 'Reproduction',
    dek: 'Zhang et al. (2025), reproduced on a 6 GB laptop GPU.',
    figure: { fig: '67%', cap: 'needle found at 64K tokens, against 33% for standard inference' },
    url: 'https://priyank766.github.io/RLM/',
    urlLabel: 'Read the write-up',
    body: [
      'I reproduced the RLM paper with a 2B model. The model never sees the whole document. It writes Python that queries focused chunks until it has an answer.',
      'At 64K tokens the RLM found the needle 67% of the time, against 33% for standard inference. I then built a QLoRA fine-tuning pipeline on the RLM’s own trajectories and ran an ablation of Muon against AdamW.',
    ],
    stack: [],
  },
  {
    name: 'ACPC Admissions Assistant',
    kind: 'Student project',
    dek: 'A trilingual voice and text assistant for Gujarat’s B.E. and B.Tech admissions.',
    figure: { fig: '1 month', cap: 'to delivery, then a Letter of Appreciation from the state' },
    body: [
      'Students can ask it about admissions by voice or text in three languages. It uses RAG for answers and speech-to-text and text-to-speech for voice.',
      'It was presented to state officials and received a Letter of Appreciation from Gujarat’s Commissioner of Technical Education (IAS) and the ACPC Chairperson.',
    ],
    stack: ['RAG', 'STT / TTS', 'FastAPI', 'React'],
  },
];

export const otherProjects = [
  {
    name: 'Cortex',
    url: 'https://github.com/priyank766/Cortex',
    text: 'An agent workspace that works inside a real project folder, with scoped file access and Docker-sandboxed shell commands that need approval.',
  },
  {
    name: 'BioAgent',
    url: 'https://github.com/priyank766/BioAgent-ALPHAFOLD',
    text: 'A LangGraph agent for structural biology across AlphaFold DB, P2Rank, AutoDock Vina, and Foldseek.',
  },
  {
    name: 'CADai',
    url: 'https://github.com/priyank766/CADai',
    text: 'A natural-language CAD agent that edits a Three.js scene through a registry of atomic tools.',
  },
  {
    name: 'Deepfake detection',
    url: 'https://github.com/priyank766/DFD-Research',
    text: 'Domain adversarial training with a gradient reversal layer, aimed at generation methods not seen in training.',
  },
];

export const earlier = [
  {
    dates: 'Dec 2025 – Jan 2026',
    role: 'Full-stack engineer, freelance',
    text: 'Built a fund-transfer platform for a client. It takes one-time, recurring, and subscription payments through Stripe, Razorpay, Cashfree, and Zumrails, verifies users through a third-party KYC provider, and has an admin dashboard for monitoring.',
    stack: ['Next.js', 'FastAPI', 'PostgreSQL'],
  },
];

export const education = {
  dates: '2023 – 2027',
  degree: 'B.E. in Artificial Intelligence & Machine Learning',
  school: 'L.D. College of Engineering, Ahmedabad (GTU)',
  note: 'Final year. CGPA 8.43 / 10.',
};

export const skills = [
  { label: 'Areas', items: ['Multi-agent systems', 'MCP', 'RAG', 'Knowledge graphs', 'Evals', 'Fine-tuning (QLoRA, SFT)', 'Voice agents (STT, TTS)'] },
  { label: 'Languages', items: ['Python', 'TypeScript', 'Go'] },
  { label: 'Agents & ML', items: ['Anthropic SDK', 'LangGraph', 'Google ADK', 'CrewAI', 'PyTorch'] },
  { label: 'Application', items: ['FastAPI', 'Node.js', 'React'] },
  { label: 'Integrations', items: ['Microsoft Graph API', 'WhatsApp Business API'] },
  { label: 'Infrastructure', items: ['Docker', 'GCP', 'AWS Bedrock', 'MLflow', 'W&B'] },
  { label: 'Data', items: ['PostgreSQL', 'MySQL', 'DynamoDB', 'SQLite'] },
];
