import BaseComponent from "./BaseComponent";
import { ColorOrHex, resolveColor3 } from "../utils";

import React, { InferEnumNames, InstanceEvent } from "@rbxts/react";
import { mapBinding } from "@rbxts/pretty-react-hooks";
import { getBaseColor, Gradient, GradientElement } from "./Gradient";

export type TextComponentInstance = TextLabel | TextButton | TextBox
export type TextComponentProps<T extends Instance = TextComponentInstance> = {
	text?: string,
	textColor?: ColorOrHex

	textSize?: number | "AUTO"

	font?: Enum.Font | Font

	align?: Enum.TextXAlignment
	verticalAlign?: Enum.TextYAlignment

	event?: InstanceEvent<T>
}

export default BaseComponent
	.expand<TextComponentInstance, TextComponentProps>(
		(props) => ({
			Text: props.text,
			TextSize: mapBinding(
				props.textSize,
				(size) =>
					typeIs(size, "number")
						? size
						: 0,
			),
			TextScaled: mapBinding(
				props.textSize,
				(size) => size === "AUTO",
			),
			TextColor3: resolveColor3(props.textColor),

			FontFace: mapBinding(
				props.font,
				(font) =>
					typeIs(font, "nil")
						? Font.fromEnum(Enum.Font.Legacy)
						: typeIs(font, "Font")
							? font // font
							: typeIs(font, "string")
								? Font.fromEnum(Enum.Font[font as InferEnumNames<Enum.Font>]) // font enum key
								: Font.fromEnum(font), // font enum
			),

			TextXAlignment: props.align,
			TextYAlignment: props.verticalAlign,
		}),
	);