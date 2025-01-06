import { AiTwotoneBuild } from "react-icons/ai";
import { GrResources } from "react-icons/gr";
import { RiToolsFill } from "react-icons/ri";
import { FaGears } from "react-icons/fa6";
import { GiHoleLadder } from "react-icons/gi";
import { IoShareSocial } from "react-icons/io5";
import MaxrollIcon from "../../assets/icons/maxroll.png";
import MobalyticsIcon from "../../assets/icons/mobalytics.png";
import GGGForumsIcon from "../../assets/icons/poelogo.png";
import POE2DBIcon from "../../assets/icons/database.png";
import POEWikiIcon from "../../assets/icons/PoEWikiLogo.png";
import FilterbladeIcon from "../../assets/icons/FilterBlade_logo.png";
import ExiledExchangeIcon from "../../assets/icons/jeweler.png";
import GenericIcon from "../../assets/icons/ExaltedOrb.png";
import RedditIcon from "../../assets/icons/reddit.png";
import DiscordIcon from "../../assets/icons/discord.png";
import DivineOrbIcon from "../../assets/icons/divine.png";

export const navMap = [
    {
        name: "Builds",
        icon: AiTwotoneBuild,
        expanded: false,
        items: [
            {
                name: "Maxroll",
                icon: MaxrollIcon,
                url: "https://maxroll.gg/poe2/planner/community-builds",
                selected: false
            },
            {
                name: "Mobalytics",
                icon: MobalyticsIcon,
                url: "https://mobalytics.gg/poe-2/creator-builds",
                selected: false
            },
            {
                name: "Forums",
                icon: GGGForumsIcon,
                url: "https://www.pathofexile.com/forum/view-forum/2216",
                selected: false
            }
        ]
    },
    {
        name: "Resources",
        icon: GrResources,
        expanded: true,
        items: [
            {
                name: "POE2DB",
                icon: POE2DBIcon,
                url: "https://poe2db.tw",
                selected: false
            },
            {
                name: "Wiki",
                icon: POEWikiIcon,
                url: "https://www.poe2wiki.net/wiki/Path_of_Exile_2_Wiki",
                selected: false
            }
        ]
    },
    {
        name: "Tools",
        icon: RiToolsFill,
        expanded: true,
        items: [
            {
                name: "Filterblade",
                icon: FilterbladeIcon,
                url: "https://www.filterblade.xyz/?game=Poe2",
                selected: false
            },
            {
                name: "Exiled Exchange",
                icon: ExiledExchangeIcon,
                url: "https://github.com/Kvan7/exiled-exchange-2/releases",
                selected: false
            },
            {
                name: "Instilling Calc",
                icon: MaxrollIcon,
                url: "https://maxroll.gg/poe2/instilling-calculator",
                selected: false
            },
            {
                name: "Passive Tree",
                icon: MaxrollIcon,
                url: "https://maxroll.gg/poe2/passive-tree/",
                selected: false
            },
            {
                name: "Build Planner",
                icon: MobalyticsIcon,
                url: "https://mobalytics.gg/poe-2/planner/builds",
                selected: false
            },
            {
                name: "Craft of Exile",
                icon: GenericIcon,
                url: "https://www.craftofexile.com/?game=poe2",
                selected: false
            }
        ]
    },
    {
        name: "GGG Official",
        icon: FaGears,
        expanded: false,
        items: [
            {
                name: "Announcements",
                icon: GenericIcon,
                url: "https://www.pathofexile.com/forum/view-forum/2211",
                selected: false
            },
            {
                name: "Patch Notes",
                icon: GenericIcon,
                url: "https://www.pathofexile.com/forum/view-forum/2212",
                selected: false
            },
            {
                name: "Trade",
                icon: GenericIcon,
                url: "https://www.pathofexile.com/trade2",
                selected: false
            },
            {
                name: "Shop",
                icon: GenericIcon,
                url: "https://pathofexile2.com/purchase",
                selected: false
            },
            {
                name: "Bug Reports",
                icon: GenericIcon,
                url: "https://www.pathofexile.com/forum/view-forum/2214",
                selected: false
            },
        ]
    },
    {
        name: "Ladder",
        icon: GiHoleLadder,  
        expanded: false,
        items: [
            {
                name: "Standard",
                icon: DivineOrbIcon,
                url: "https://pathofexile2.com/ladder/Standard",
                selected: false
            },
            {
                name: "Hardcore",
                icon: DivineOrbIcon,
                url: "https://pathofexile2.com/ladder/Hardcore",
                selected: false
            },
            {
                name: "Standard SSF",
                icon: DivineOrbIcon,
                url: "https://pathofexile2.com/ladder/Solo%2520Self-Found",
                selected: false
            },
            {
                name: "Hardcore SSF",
                icon: DivineOrbIcon,
                url: "https://pathofexile2.com/ladder/Hardcore%2520SSF",
                selected: false
            }
        ]
    },
    {
        name: "Social",
        icon: IoShareSocial,  
        expanded: false,
        items: [
            {
                name: "POE 1 Official",
                icon: RedditIcon,
                url: "https://reddit.com/r/pathofexile",
                selected: false
            },
            {
                name: "POE 2 Official",
                icon: RedditIcon,
                url: "https://reddit.com/r/pathofexile2",
                selected: false
            },
            {
                name: "POE 1 Builds",
                icon: RedditIcon,
                url: "https://www.reddit.com/r/PathOfExileBuilds/",
                selected: false
            },
            {
                name: "POE 2 Builds",
                icon: RedditIcon,
                url: "https://www.reddit.com/r/PathOfExile2Builds/",
                selected: false
            },
            {
                name: "Discord Chat",
                icon: DiscordIcon,
                url: "https://discord.gg/pathofexile",
                selected: false
            },
        ]
    }
]