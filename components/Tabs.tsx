import { cloneElement } from "react";

interface TabsProps {
  children?: React.ReactElement[];
  setActiveIndex: (index: string) => void;
  onClickTabs?: (index: string) => void;
}

export function Tabs(props: TabsProps) {
  const { children, setActiveIndex, onClickTabs } = props;

  const handleOnClickTab = (e: React.SyntheticEvent) => {
    setActiveIndex(e.currentTarget.id);
    onClickTabs && onClickTabs(e.currentTarget.id);
  };

  return (
    <div>
      {children?.map((c, idx) =>
        cloneElement(c, {
          key: idx,
          onClick: handleOnClickTab,
        })
      )}
    </div>
  );
}

interface ContentsProps {
  children: React.ReactElement[];
  activeIndex: string;
}

export function Contents(props: ContentsProps) {
  const { children, activeIndex } = props;

  return <>{children.map(c => c.props.id === activeIndex && c)}</>;
}
