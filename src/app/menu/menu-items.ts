export class Menu {
    id_menu: number;
    order_menu: number;
    code_menu: string;
    libelle_menu: string;
    routerLink: string ;
    sousMenus:SousMenu[];
    class: string;

}
export class SousMenu {
    id_sousMenu: number;
    id_menu: number;
    code_sousMenu: string;
    libelle_sousMenu: string;
    module_sousMenu: string;
    routerLink_sousMenu: string;

}
export const SOUSMENUS: SousMenu[] = [
    {id_sousMenu: 1, id_menu: 12, code_sousMenu: 'personnel', libelle_sousMenu: 'Personnels', module_sousMenu: 'parametre', routerLink_sousMenu: '/parametres/personnel/personnel-listing'/*, create_date: ISODate('2018-111-13'), create_by: 0, update_date: null, update_by: null, del: 0*/},
    {id_sousMenu: 2, id_menu: 12, code_sousMenu: 'specialite', libelle_sousMenu: 'Sp&eacute;cialit&eacute;s', module_sousMenu: 'parametre', routerLink_sousMenu: '/parametres/specialites/specialites-listing'},
    {id_sousMenu: 3, id_menu: 12, code_sousMenu: 'servunit', libelle_sousMenu: 'Services/Unit&eacute;s', module_sousMenu: 'parametre', routerLink_sousMenu: '/parametres/services/services-listing'},
    {id_sousMenu: 4, id_menu: 12, code_sousMenu: 'chamlit', libelle_sousMenu: 'Chambres/Lits', module_sousMenu: 'parametre', routerLink_sousMenu: '/parametres/chambres/chambres-listing'},
    {id_sousMenu: 5, id_menu: 12, code_sousMenu: 'profiluser', libelle_sousMenu: 'Profile utilisateur', module_sousMenu: 'parametre', routerLink_sousMenu: '/parametres/profil/profil-listing'},
    {id_sousMenu: 6, id_menu: 12, code_sousMenu: 'utilisateur', libelle_sousMenu: 'Utilisateurs', module_sousMenu: 'parametre', routerLink_sousMenu: '/parametres/utilisateurs/utilisateurs-listing'},
    {id_sousMenu: 7, id_menu: 12, code_sousMenu: 'basemedicament', libelle_sousMenu: 'Base m&eacute;dicament', module_sousMenu: 'parametre', routerLink_sousMenu: '/parametres/base-medicament/base-medicament-listing'},
    {id_sousMenu: 8, id_menu: 12, code_sousMenu: 'basediagnostique', libelle_sousMenu: 'Base de pathologies', module_sousMenu: 'parametre', routerLink_sousMenu: '/parametres/base-diagnostique/base-diagnostique-listing'},
    {id_sousMenu: 9, id_menu: 12, code_sousMenu: 'typerdv', libelle_sousMenu: 'Type de rendez-vous', module_sousMenu: 'parametre', routerLink_sousMenu: '/parametres/type-rvs/type-rvs-listing'},
    {id_sousMenu: 10, id_menu: 12, code_sousMenu: 'typeconsultation', libelle_sousMenu: 'Type de consultation', module_sousMenu: 'parametre', routerLink_sousMenu: '/parametres/type-consult/type-consult-listing'},
    {id_sousMenu: 11, id_menu: 12, code_sousMenu: 'typeexamen', libelle_sousMenu: 'Type examen', module_sousMenu: 'parametre', routerLink_sousMenu: '/parametres/type-examen/type-examen-listing'},
    {id_sousMenu: 12, id_menu: 12, code_sousMenu: 'confmenu', libelle_sousMenu: 'Configuration menu', module_sousMenu: 'parametre', routerLink_sousMenu: '/parametres/menu-config'},
    {id_sousMenu: 13, id_menu: 12, code_sousMenu: 'miseajour', libelle_sousMenu: 'Mise &agrave; jour', module_sousMenu: 'parametre', routerLink_sousMenu: '/parametres/update'},
    {id_sousMenu: 14, id_menu: 12, code_sousMenu: 'licence', libelle_sousMenu: 'Licence', module_sousMenu: 'parametre', routerLink_sousMenu: '/parametres/licence'},

];
export const MENUS: Menu[] = [
    {id_menu: 1, order_menu: 10, code_menu: 'tab_bord', libelle_menu: 'Tableau de bord', routerLink: '/dashbord', sousMenus: null, class: ''},
    {id_menu: 2, order_menu: 30, code_menu: 'patients', libelle_menu: 'Patients', routerLink: '/patients/patients-listing', sousMenus: null, class: ''},
    {id_menu: 3, order_menu: 40, code_menu: 'consultations', libelle_menu: 'Consultations', sousMenus: null, routerLink: '/consultations/consultations-listing', class: ''},
    {id_menu: 4, order_menu: 50, code_menu: 'ordonnances', libelle_menu: 'Ordonnances', sousMenus: null, routerLink: '/ordonnances/ordonnances-listing', class: ''},
    {id_menu: 5, order_menu: 60, code_menu: 'rdv', libelle_menu: 'Rendez-vous', sousMenus: null, routerLink: '/rendez-vous/rdv-listing', class: ''},
    {id_menu: 6, order_menu: 70, code_menu: 'hospitalisation', libelle_menu: 'Hospitalisation', sousMenus: null, routerLink: null /*'/hospitalisation'*/, class: ''},
    {id_menu: 7, order_menu: 80, code_menu: 'examen', libelle_menu: 'Examen', sousMenus: null, routerLink: null /*'/examen'*/, class: ''},
    {id_menu: 8, order_menu: 90, code_menu: 'planning', libelle_menu: 'Planning', sousMenus: null, routerLink: null /*'/planning'*/, class: ''},
    {id_menu: 9, order_menu: 100, code_menu: 'gestion', libelle_menu: 'Gestion', sousMenus: null, routerLink: null /*'/gestion'*/, class: ''},
    {id_menu: 10, order_menu: 110, code_menu: 'statistique', libelle_menu: 'Statistiques', sousMenus: null, routerLink: null /*'/statistiques'*/, class: ''},
    {id_menu: 11, order_menu: 120, code_menu: 'rapport_imp', libelle_menu: 'Rapports & impression', sousMenus: null, routerLink: null /*'/rapport-impression'*/, class: ''},
    { id_menu: 12, order_menu: 130, code_menu: 'prams', libelle_menu: 'Param&egrave;tres', sousMenus: SOUSMENUS , routerLink: null, class: 'remove-all-space w-5 fa  fa-chevron-down color-g cursor-pointer'},
];


