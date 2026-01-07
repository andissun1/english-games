import { Outlet } from 'react-router';
import { Header } from '../components/Header/Header';
import style from './Layout.module.css';

export const Layout = () => (
  <>
    <Header />
    <div className={style.page} children={<Outlet />} />
  </>
);
