import 'package:flutter/material.dart';

class RoundedRectangle extends StatelessWidget {
  final Widget child;
  final Color color;
  final EdgeInsets padding;
  final ImageProvider? backgroundImage;
  final double? width;
  final double? height;
  final double borderWidth;
  final BorderRadius borderRadius;
  final Color borderColor;
  final bool hasShadow;
  final bool fit;
  final BoxFit imageFit;
  const RoundedRectangle(
      {super.key, required this.child,
      this.color = Colors.white,
      this.padding = EdgeInsets.zero,
      this.borderRadius = const BorderRadius.all(Radius.circular(15)),
      this.borderWidth = 0,
      this.fit = false,
      this.imageFit = BoxFit.cover,
      this.borderColor = Colors.black,
      this.hasShadow = false,
      this.backgroundImage,
      this.height,
      this.width});
  @override
  Widget build(BuildContext context) {
    var constraints = (width != null || height != null || fit) ? null : BoxConstraints.expand();
    return ClipRRect(
        borderRadius: borderRadius,
        child: Container(
            width: width ?? (fit ? null : double.infinity),
            height: height ?? (fit ? null : double.infinity),
            margin: hasShadow ? const EdgeInsets.all(3) : null,
            constraints: constraints,
            clipBehavior: Clip.none,
            decoration: BoxDecoration(
                border: borderWidth > 0 ? Border.all(width: borderWidth, color: borderColor) : null,
                boxShadow: hasShadow
                    ? [
                        BoxShadow(
                            color: Colors.black.withOpacity(0.3),
                            blurRadius: 2.0,
                            offset: const Offset(0, 2))
                      ]
                    : [],
                image: backgroundImage != null
                    ? DecorationImage(image: backgroundImage!, fit: imageFit)
                    : null,
                color: color,
                borderRadius: borderRadius),
            child: Padding(padding: padding, child: child)));
  }
}
