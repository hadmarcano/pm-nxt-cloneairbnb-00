import { TbBeach, TbMountain, TbPool } from "react-icons/tb";
import {
	GiBarn,
	GiBoatFishing,
	GiCastle,
	GiCaveEntrance,
	GiForestCamp,
	GiCactus,
	GiIsland,
	GiWindmill,
} from "react-icons/gi";
import { FaSkiing } from "react-icons/fa";
import { BsSnow } from "react-icons/bs";
import { IoDiamond } from "react-icons/io5";
import { MdOutlineVilla } from "react-icons/md";


export const categories = [
	{
		label:"Playa",
		icon: TbBeach,
		description: "Esta propiedad esta cercana a la playa!"
	},
	{
		label:"Brisa",
		icon: GiWindmill,
		description: "Esta propiedad se encuentra en un lugar muy fresco!"
	},
	{
		label:"Moderno",
		icon: MdOutlineVilla,
		description: "Esta propiedad es moderna y minimalista!"
	},
	{
		label:"Céntrico",
		icon: TbMountain,
		description: "Esta propiedad es centrica y de muy buen acceso!"
	},
	{
		label:"Piscina",
		icon: TbPool,
		description: "Esta propiedad posee piscina!"
	},
	{
		label:"Isla",
		icon: GiIsland,
		description: "Esta propiedad se encuentra en una hermosa isla!"
	},
	{
		label:"Río",
		icon: GiBoatFishing,
		description: "Esta propiedad se encuentra cerca de un hermoso rio!"
	},
	{
		label:"Recreativo",
		icon: FaSkiing,
		description: "Esta propiedad brinda actividades recreativas!"
	},
	{
		label:"Medieval",
		icon: GiCastle,
		description: "Esta propiedad tiene un estilo medieval!"
	},
	{
		label:"Aventurero",
		icon: GiCaveEntrance,
		description: "Esta propiedad está cercana a maravillosas cuevas!"
	},
	{
		label:"relajante",
		icon: GiForestCamp,
		description: "Esta propiedad se encuentra en un camping con tinajas!"
	},
	{
		label:"Desértico",
		icon: GiCactus,
		description: "Esta propiedad se encuentra en un desierto florido!"
	},
	{
		label:"Campestre",
		icon: GiBarn,
		description: "Esta propiedad se encuentra en un hermoso campo!"
	},
	{
		label:"Nevado",
		icon: BsSnow,
		description: "Esta propiedad se encuentra en un lugar nevado!"
	},
	{
		label:"Lujoso",
		icon: IoDiamond,
		description: "Esta propiedad es lujosa y de mucho prestigio!"
	},
];
