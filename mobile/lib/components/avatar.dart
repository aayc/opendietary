import 'package:cached_network_image/cached_network_image.dart';
import 'package:firebase_database/firebase_database.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:opendietary/subcomponents/smart_image_provider.dart';

class Avatar extends StatefulWidget {
  final String img;
  final double size;
  final String? uid;

  Avatar({
    required this.img,
    this.size = 48,
    this.uid,
  });

  @override
  State<Avatar> createState() => _AvatarState();
}

class _AvatarState extends State<Avatar> {
  Widget getPlaceholder({String img = "assets/img/placeholder_profile.png"}) {
    return Container(
        width: widget.size,
        height: widget.size,
        padding: EdgeInsets.zero,
        decoration: BoxDecoration(
            shape: BoxShape.circle,
            image: DecorationImage(
              image: SmartImageProvider(img),
              fit: BoxFit.cover,
            )));
  }

  @override
  Widget build(BuildContext context) {
    return Stack(
      children: [
        if (widget.img.startsWith("http"))
          ClipRRect(
              borderRadius: BorderRadius.circular(30),
              child: CachedNetworkImage(
                fadeInDuration: const Duration(milliseconds: 0),
                fadeOutDuration: const Duration(milliseconds: 0),
                imageUrl: widget.img,
                width: widget.size,
                height: widget.size,
                fit: BoxFit.cover,
                useOldImageOnUrlChange: true,
                //errorWidget: (_, __, ___) => getPlaceholder(),
                //placeholder: (_, __) => getPlaceholder(),
              ))
      ],
    );
  }
}
