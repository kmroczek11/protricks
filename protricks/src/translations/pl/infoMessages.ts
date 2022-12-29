import LooksOneOutlinedIcon from "@mui/icons-material/LooksOneOutlined";
import LooksTwoOutlinedIcon from "@mui/icons-material/LooksTwoOutlined";
import Looks3OutlinedIcon from "@mui/icons-material/Looks3Outlined";

const exercisesPlanMessages = [
    {
        title: "Rozgrzewka",
        text: `Podopiecznych od początku uczymy,
      Jak ważna ona jest do podniesienia efektywności
      Treningowej i uniknięcia kontuzji.
      Każda nasza rozgrzewka oparta jest o protokół R.A.M.P.
      Dlatego jest tak bardzo skuteczna.`,
        titleColor: "error.main",
        ElementIcon: LooksOneOutlinedIcon,
    },
    {
        title: "Część akrobatyczna",
        text: `Czyli to, co wszyscy lubimy najbardziej.
      Tutaj uczymy się wszystkich salt, przerzutów,
      Kształtujemy koordynację ruchową,
      Zwinność oraz walczymy ze strachem, oczywiście w
      Kontrolowanych warunkach.`,
        titleColor: "#424242",
        ElementIcon: LooksTwoOutlinedIcon,
    },
    {
        title: "Rozciąganie/Wzmacnianie/Zabawa",
        text: `Na samym końcu jednostki treningowej, w
      Zależności od decyzji trenera oraz poziomu
      Zaawansowania grupy, robimy krótkie wzmacnianie,
      Poprawiające siłę i szybkość, rozciąganie, które dba
      O odpowiednie zakresy ruchu lub zabawę ruchową,
      Która udoskonala koordynację, poprawia zwinność,
      A zarazem przynosi mnóstwo frajdy.`,
        titleColor: "#01579b",
        ElementIcon: Looks3OutlinedIcon,
    },
];

const choosingGroupMessages = [
    {
        name: `Jeśli osoba nie miała wcześniej większego kontaktu z sportem polecamy
      zacząć od grupy wprowadzającej, Ukształtuje odpowiednią siłę i gibkośc
      oraz zostanie wprowadzona do pięknego świata akrobatyki.`,
    },
    {
        name: `Grupę podstawową polecamy osobą, które miały wcześniej kontakt z
          sportem. Ćwiczymy tutaj między innymi takie elementy jak stanie na rękach,
          przewroty, gwiazdy czy przejścia.`,
    },
    {
        name: `Grupa średnio-zaawansowana jest dla osób, które ćwiczyły już wcześniej
          akrobatykę. Jeśli takie elementy jak rundak, stanie na rękach, przejścia w
          przód i w tył nie stanowią dla niej większego problemu,to idealne
          sprawdzi się w tej grupie.`,
    },
];



export { exercisesPlanMessages, choosingGroupMessages }