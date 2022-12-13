import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

// ignore: non_constant_identifier_names
ImageProvider SmartImageProvider(data, {int? maxWidth}) {
  if (data == null) {
    return const AssetImage("assets/img/placeholder_img.jpg");
  } else if (data.startsWith('http')) {
    return CachedNetworkImageProvider(data, maxWidth: maxWidth);
  } else {
    return AssetImage(data);
  }
}
