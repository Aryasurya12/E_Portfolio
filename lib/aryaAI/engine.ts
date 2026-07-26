import { projects } from '../../data/projects';
import { portfolioKnowledge } from '../../data/portfolioKnowledge';
import { Project } from '../../types';

export interface AIResponse {
  text: string;
  actionButtons?: { label: string; action: 'navigate' | 'open_project' | 'open_link'; payload: string }[];
  projectCards?: Project[];
}

let sessionContext: { lastProjectId?: string; lastSubject?: string } = {};

export function clearSession() {
  sessionContext = {};
}

function extractProjectIds(query: string): string[] {
  const ids: string[] = [];
  const lower = query.toLowerCase();
  
  if (lower.includes('krushit')) ids.push('krushit-ai');
  if (lower.includes('shespeaks')) ids.push('SheSpeaks');
  if (lower.includes('zync')) ids.push('zync');
  if (lower.includes('codequest') || lower.includes('gamified')) ids.push('codequest');
  if (lower.includes('pm2.5') || lower.includes('air pollution') || lower.includes('air quality')) ids.push('pm25-air-quality');
  if (lower.includes('bean') || lower.includes('dry bean')) ids.push('dry-bean-classification');
  if (lower.includes('spacescope') || lower.includes('space')) ids.push('spacescope');
  
  return ids;
}

export function processQuery(query: string): AIResponse {
  const lower = query.toLowerCase();

  // 1. GITHUB
  if (lower.includes('github') || lower.includes('git hub')) {
    return {
      text: "You can explore Arya's open-source work and project repositories on GitHub.",
      actionButtons: [{ label: 'VIEW GITHUB', action: 'open_link', payload: portfolioKnowledge.links.github }]
    };
  }

  // 2. RESUME
  if (lower.includes('resume') || lower.includes('cv') || lower.includes('download cv')) {
    return {
      text: "Sure — you can view Arya's resume here.",
      actionButtons: [{ label: 'VIEW RESUME', action: 'open_link', payload: portfolioKnowledge.links.resume }]
    };
  }

  // 3. CONTACT
  if (lower.includes('contact') || lower.includes('email') || lower.includes('hire') || lower.includes('reach out')) {
    return {
      text: "You can reach out to Arya directly through the contact form. She is currently open to AI/ML and software engineering opportunities.",
      actionButtons: [{ label: 'CONTACT ARYA', action: 'navigate', payload: 'contact' }]
    };
  }

  // 4. SKILLS / TECH STACK
  if (lower.includes('skill') || lower.includes('tech') || lower.includes('python') || lower.includes('react') || lower.includes('frontend')) {
    if (lower.includes('python')) {
      return {
        text: "Arya uses Python extensively for AI/ML projects, specifically working with Pandas, Scikit-learn, XGBoost, and TensorFlow.",
        actionButtons: [{ label: 'VIEW ML PROJECTS', action: 'navigate', payload: 'projects' }]
      };
    }
    if (lower.includes('frontend')) {
      return {
        text: "For frontend engineering, Arya specializes in React, Next.js, Tailwind CSS, and Framer Motion.",
        actionButtons: [{ label: 'VIEW SKILLS', action: 'navigate', payload: 'skills' }]
      };
    }
    return {
      text: "Arya is a Frontend & Mobile Developer specializing in AI/ML. Her primary stack includes Python, TypeScript, React, and various Machine Learning frameworks.",
      actionButtons: [{ label: 'VIEW SKILLS', action: 'navigate', payload: 'skills' }]
    };
  }

  // 5. ACHIEVEMENTS & EXPERIENCE
  if (lower.includes('achievement') || lower.includes('hackathon') || lower.includes('won')) {
    return {
      text: "Arya's notable achievements include winning hackathons (such as with the SheSpeaks project) and building multiple end-to-end ML classification models.",
      actionButtons: [{ label: 'VIEW COMPETITIONS', action: 'navigate', payload: 'competitions' }]
    };
  }
  if (lower.includes('experience') || lower.includes('internship') || lower.includes('gdg')) {
    return {
      text: "Arya is a Core Technical Member at GDG and ECSA, where she organizes tech events, develops platforms, and conducts technical workshops.",
      actionButtons: [{ label: 'VIEW ABOUT', action: 'navigate', payload: 'about' }]
    };
  }

  // 6. SPECIFIC PROJECT INTENT
  const mentionedProjects = extractProjectIds(lower);
  
  if (lower.includes('compare') && lower.includes('ml')) {
    return {
      text: "PM2.5 AIR QUALITY\nType: Regression\nBest Model: Random Forest\nR²: 0.8500\n\nDRY BEAN CLASSIFICATION\nType: Multiclass Classification\nBest Model: SVM\nAccuracy: 92.36%\n\nTogether, they demonstrate experience with both regression and classification workflows.",
      actionButtons: [
        { label: 'VIEW PM2.5', action: 'open_project', payload: 'pm25-air-quality' },
        { label: 'VIEW DRY BEAN', action: 'open_project', payload: 'dry-bean-classification' }
      ]
    };
  }

  if (mentionedProjects.length > 0) {
    // Save context
    sessionContext.lastProjectId = mentionedProjects[0];
    
    if (lower.includes('open')) {
      const p = projects.find(p => p.id === mentionedProjects[0]);
      return {
        text: `Opening ${p?.title}...`,
        actionButtons: [{ label: `OPEN ${p?.title.toUpperCase()}`, action: 'open_project', payload: p!.id }]
      };
    }

    if (mentionedProjects.length === 1) {
      const p = projects.find(p => p.id === mentionedProjects[0])!;
      return {
        text: p.description,
        projectCards: [p],
        actionButtons: [{ label: `OPEN ${p.title.toUpperCase()}`, action: 'open_project', payload: p.id }]
      };
    }
  }

  // 7. FOLLOW UP QUESTIONS (Context-aware)
  if (sessionContext.lastProjectId && (lower.includes('model') || lower.includes('accuracy') || lower.includes('r²') || lower.includes('best'))) {
    if (sessionContext.lastProjectId === 'pm25-air-quality') {
      return {
        text: "For the PM2.5 project, the best model was the Random Forest Regressor, which achieved an R² score of 0.8500 and an RMSE of 30.5989.",
        actionButtons: [{ label: 'VIEW PROJECT', action: 'open_project', payload: 'pm25-air-quality' }]
      };
    }
    if (sessionContext.lastProjectId === 'dry-bean-classification') {
      return {
        text: "For the Dry Bean Classification, the Support Vector Machine (SVM) performed best, achieving a test accuracy of 92.36%.",
        actionButtons: [{ label: 'VIEW PROJECT', action: 'open_project', payload: 'dry-bean-classification' }]
      };
    }
  }

  // 8. PROJECT SEARCH / FILTERING
  if (lower.includes('xgboost')) {
    return {
      text: "XGBoost appears in two ML projects:\n\nPM2.5 Air Quality Prediction\nUsed as one of four regression models.\n\nDry Bean Classification\nUsed as one of four multiclass classification models.",
      actionButtons: [
        { label: 'VIEW PM2.5', action: 'open_project', payload: 'pm25-air-quality' },
        { label: 'VIEW DRY BEAN', action: 'open_project', payload: 'dry-bean-classification' }
      ]
    };
  }
  
  if (lower.includes('ai/ml') || lower.includes('ml') || lower.includes('ai project')) {
    return {
      text: "For AI/ML work, I'd start with these:\n\n01 // Krushit\nAI-driven agriculture platform.\n\n02 // PM2.5 Air Quality Prediction\nRegression-based ML project (Random Forest R² 0.85).\n\n03 // Dry Bean Classification\nSeven-class ML classification (SVM 92.36%).\n\n04 // CodeQuest\nGamified Python learning platform.",
      actionButtons: [{ label: 'EXPLORE AI/ML PROJECTS', action: 'navigate', payload: 'projects' }]
    };
  }

  if (lower.includes('project') || lower.includes('best') || lower.includes('work')) {
    return {
      text: "Arya has a diverse portfolio spanning AI/ML, IoT, and Modern Web Development. Some of her strongest projects are Krushit (AI Agriculture), PM2.5 Air Quality Prediction, and SheSpeaks (IoT Safety).",
      actionButtons: [{ label: 'EXPLORE ALL PROJECTS', action: 'navigate', payload: 'projects' }]
    };
  }

  // 9. UNKNOWN
  return {
    text: "I'm designed specifically to answer questions about Arya's work, skills and technical journey.",
    actionButtons: [
      { label: 'EXPLORE PROJECTS', action: 'navigate', payload: 'projects' },
      { label: 'VIEW SKILLS', action: 'navigate', payload: 'skills' }
    ]
  };
}
