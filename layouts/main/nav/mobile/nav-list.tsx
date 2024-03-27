import Collapse from '@mui/material/Collapse';

import { useActiveLink } from '#/routes/hooks/use-active-link';

import { useBoolean } from '#/hooks/use-boolean';


import NavItem from './nav-item';
import { NavListProps } from '../types';

// ----------------------------------------------------------------------

export default function NavList({ data }: NavListProps) {
  const active = useActiveLink(data.path, !!data.children);

  const menuOpen = useBoolean();

  return (
    <>
      <NavItem
        open={menuOpen.value}
        onClick={menuOpen.onToggle}
        //
        title={data.title}
        path={data.path}
        //
        active={active}
        hasChild={!!data.children}
        externalLink={data.path.includes('http')}
      />

    </>
  );
}
