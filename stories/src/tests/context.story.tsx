import React, { Binding, useMemo } from "@rbxts/react";
import { App } from "../App";

import { hoarcekat, joinAnyBindings } from "@rbxts/pretty-react-hooks";
import { BaseComponent } from "@rbxts/better-react-components/out/helpers";
import { Players } from "@rbxts/services";

type ImageProfileProps = {
	userId: number,
	thumbnailType: Enum.ThumbnailType,
	thumbnailSize: Enum.ThumbnailSize,
}

const ImageProfile = BaseComponent
	.expandContext<ImageProfileProps, { imageUri: Binding<string> }>(
		(userProps) => {
			/**
			 * This looks scary
			 * In reality, its joining any bindings and passes them to GetUserThumbnailAsync
			 */
			const imageUri = useMemo(
				() => {
					return joinAnyBindings({
						userId: userProps.userId,
						thumbnailType: userProps.thumbnailType,
						thumbnailSize: userProps.thumbnailSize,
					}).map(({
								userId,
								thumbnailType,
								thumbnailSize,
							}) => Players.GetUserThumbnailAsync(userId!, thumbnailType!, thumbnailSize!)[0]);
				},
				[userProps.userId, userProps.thumbnailType, userProps.thumbnailSize],
			);


			return { imageUri };
		},
	)
	.expand<ImageLabel, ImageProfileProps>((userProps, context) => ({
		Image: context.imageUri,
	}))
	.build("imagelabel");

export = hoarcekat(() => {
	return (
		<App>
			<ImageProfile
				userId={1}
				thumbnailType={Enum.ThumbnailType.AvatarThumbnail}
				thumbnailSize={Enum.ThumbnailSize.Size420x420}
				size={new UDim2(0, 128, 0, 128)}
			/>
		</App>
	);
})