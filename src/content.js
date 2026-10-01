// All site copy lives here so it can be edited without touching layout code.

export const person = {
  name: 'Priyank Patel',
  roles: ['AI Engineer', 'Forward Deployed Engineer'],
  location: 'Ahmedabad, Gujarat, India',
  positioning:
    'I build production multi-agent systems for enterprise clients and deploy them alongside the executives who use them.',
  about: [
    'I work at SaarthiOS, where I build Right Hand, an AI chief of staff for executives. I write the agents and I also deploy them. I work directly with the executives who use the system, and what I learn from them goes back into the product.',
    'I’m in the final year of a B.E. in Artificial Intelligence and Machine Learning at L.D. College of Engineering. Outside work I review code for Kubeflow and build tools for coding agents.',
  ],
};

export const links = {
  email: 'priyank8445@gmail.com',
  github: 'https://github.com/priyank766',
  linkedin: 'https://www.linkedin.com/in/priyank766/',
  site: 'https://priyank.is-a.dev',
};

export const now = {
  role: 'AI Product Engineer',
  company: 'SaarthiOS',
  companyUrl: 'https://saarthios.com',
  dates: 'Jun 2026 – present',
  place: 'Remote',
  project: 'Right Hand',
  dek: 'An AI chief of staff. It reads an executive’s inbox and tells them what needs their attention today.',
  intro: [
    'Right Hand is live with three clients. The people who use it every day are promoters, CFOs, and CEOs. It runs as a multi-agent system on the Anthropic SDK and AWS Bedrock.',
  ],
  sections: [
    {
      heading: 'The first version',
      paragraphs: [
        'I started with a rule-based Context Graph. Every answer it gave cited its source down to the page and line.',
        'It degraded with the second client. Each new supplier needed new rules. I replaced it with an agent design where a new client needs only configuration.',
      ],
    },
    {
      heading: 'Three agents',
      agents: [
        {
          name: 'Profiler',
          text: 'Learns how each executive works by reading their past mail.',
        },
        {
          name: 'Interpreter',
          text: 'Groups related emails into one situation.',
        },
        {
          name: 'Chief of Staff',
          text: 'Narrows 100+ open situations to the 5 that need action today. For each one it recommends a next step in the executive’s usual tone. It grounds that recommendation first in how the executive handled similar cases before.',
        },
      ],
    },
    {
      heading: 'Made for real mail',
      paragraphs: [
        'The agents read executive inboxes, so the limits are strict. Their tools are read-only and can see only one person’s data. Every run has hard limits on steps and cost. When the evidence runs out, the system says it can’t tell. It does not guess.',
      ],
    },
    {
      heading: 'Getting the mail in',
      paragraphs: [
        'An ingestion pipeline pulls mail from Microsoft Graph every 15 minutes and on event triggers. A Context Builder agent converts DOCX, PDF, CSV, XLSX, and PPTX files into Markdown that links back to the source. It runs across corpora of more than 4,000 documents.',
      ],
    },
    {
      heading: 'In the field',
      paragraphs: [
        'I scope requirements directly with client executives. Recommendations reach them through the WhatsApp Business API, as text or as voice. I set up the second client’s infrastructure on GCP with Cloud Run, GCS, and Compute Engine. When the same issue keeps coming up in the field, I turn it into a product change.',
      ],
    },
  ],
  stack: ['Anthropic SDK', 'AWS Bedrock', 'Microsoft Graph', 'WhatsApp Business API', 'GCP'],
};

const mcp = (n) => `https://github.com/kubeflow/mcp-server/pull/${n}`;
const sdk = (n) => `https://github.com/kubeflow/sdk/pull/${n}`;

export const openSource = {
  org: 'Kubeflow',
  orgNote: 'CNCF',
  intro: {
    reviewerUrl: mcp(288),
    memberUrl: 'https://github.com/kubeflow/internal-acls/pull/951',
  },
  repos: [
    {
      name: 'kubeflow/mcp-server',
      url: 'https://github.com/kubeflow/mcp-server',
      prs: [
        { n: 21, url: mcp(21), text: 'Added OpenTelemetry tracing for tool calls.' },
        { n: 198, url: mcp(198), text: 'Added a confirmation gate before a training job can be modified.' },
        { n: 167, url: mcp(167), text: 'Capped memory use when streaming job logs.' },
        { n: 192, url: mcp(192), text: 'Fixed runtime-metadata extraction.' },
        { n: 46, url: mcp(46), text: 'Fixed pip permission detection on OpenShift.' },
        { n: 196, url: mcp(196), text: 'Extended the Kubernetes E2E suite with negative-path and lifecycle scenarios.' },
        { n: 73, url: mcp(73), text: 'Added CI that catches lockfile regressions.' },
      ],
    },
    {
      name: 'kubeflow/sdk',
      url: 'https://github.com/kubeflow/sdk',
      prs: [
        { n: 340, url: sdk(340), text: 'Fixed trainer status never reaching TRAINJOB_COMPLETE.' },
        { n: 313, url: sdk(313), text: 'Made dataset and model initializers run in parallel to shorten job startup.' },
      ],
    },
  ],
};

export const projects = [
  {
    name: 'Anchor',
    kind: 'MCP server',
    dek: 'Shared memory for coding agents.',
    url: 'https://anchormem.me',
    urlLabel: 'anchormem.me',
    body: [
      'Coding agents forget everything between sessions, and they don’t share what they know with each other. Anchor is an MCP server that gives Claude Code, Cursor, Cline, and Codex one persistent memory of facts, decisions, and past work. It supersedes stale entries and redacts secrets before anything is written. It is published on npm.',
      'In reproducible evaluation suites it compressed context 44× and still recovered 100% of critical facts across 8 scenarios. Recall stays under 4 ms at p50 with 10,000 memories stored.',
    ],
    stack: ['TypeScript', 'MCP', 'SQLite FTS5 / BM25', 'Node.js'],
  },
  {
    name: 'Hermes-BIO',
    kind: 'Agent harness',
    dek: 'An agentic harness for drug-discovery research.',
    url: 'https://github.com/priyank766/Hermes-BIO',
    urlLabel: 'github.com/priyank766/Hermes-BIO',
    body: [
      'You give it a disease. It picks a target, lists druggable targets that nobody has worked hard on, and finds approved drugs that bind the target but are approved for something else. A Gemini function-calling loop chains UniProt, OpenTargets, RCSB PDB, AlphaFold DB, and ChEMBL. It runs from a React UI, a CLI, or as an MCP server.',
      'It recovered the textbook target in 6 of 6 benchmark diseases at about 38 seconds per disease. On 4 harder diseases with no textbook answer, all 4 picks were defensible. Persistent memory makes a repeat run on the same disease roughly 3× faster.',
    ],
    stack: ['FastAPI', 'Gemini function calling', 'FastMCP', 'RDKit', 'React', 'SQLite'],
  },
  {
    name: 'Recursive Language Models',
    kind: 'Reproduction',
    dek: 'Zhang et al. (2025), reproduced on a laptop.',
    url: 'https://priyank766.github.io/RLM/',
    urlLabel: 'Read the write-up',
    body: [
      'I reproduced the RLM paper with a 2B model on a 6 GB laptop GPU. The model never sees the whole document. It writes Python that queries focused chunks until it has an answer.',
      'At 64K tokens the RLM found the needle 67% of the time. Standard inference found it 33% of the time. I then built a QLoRA fine-tuning pipeline on the RLM’s own trajectories and ran an ablation of Muon against AdamW.',
    ],
    stack: [],
  },
  {
    name: 'ACPC Admissions Assistant',
    kind: 'Student project',
    dek: 'A trilingual voice and text assistant for Gujarat’s engineering admissions.',
    body: [
      'Students applying to B.E. and B.Tech programmes in Gujarat can ask it questions by voice or text in three languages. It was delivered in one month. It uses RAG for answers and speech-to-text and text-to-speech for voice.',
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
