import React, { createContext, useContext, useState } from 'react';

interface ProjectContextType {
  isProjectExpanded: boolean;
  setProjectExpanded: (expanded: boolean) => void;
  shouldRevealHeader: boolean;
  setShouldRevealHeader: (reveal: boolean) => void;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export function ProjectProvider({ children }: { children: React.ReactNode }) {
  const [isProjectExpanded, setProjectExpanded] = useState(false);
  const [shouldRevealHeader, setShouldRevealHeader] = useState(false);

  return (
    <ProjectContext.Provider 
      value={{ 
        isProjectExpanded, 
        setProjectExpanded,
        shouldRevealHeader,
        setShouldRevealHeader
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
}

export function useProject() {
  const context = useContext(ProjectContext);
  if (context === undefined) {
    throw new Error('useProject must be used within a ProjectProvider');
  }
  return context;
}
