import 'package:flutter/material.dart';

class Spinnable extends StatefulWidget {
  final Widget child;
  final Function()? onTap;

  const Spinnable({super.key, required this.onTap, required this.child});

  @override
  _SpinnableState createState() => _SpinnableState();
}

class _SpinnableState extends State<Spinnable> with SingleTickerProviderStateMixin {
  final double pi = 3.1415926535897932;
  double _rotation = 0;
  AnimationController? _controller;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
        vsync: this, duration: const Duration(milliseconds: 20000), lowerBound: 0.0, upperBound: 40 * pi)
      ..addListener(() {
        setState(() {});
      });
  }

  @override
  void dispose() {
    _controller?.dispose();
    super.dispose();
  }

  void _onTapDown(TapDownDetails details) {
    _controller?.forward();
  }

  void _onTapUp() {
    _controller?.reset();
  }

  @override
  Widget build(BuildContext context) {
    _rotation = _controller!.value;

    return GestureDetector(
        onTapDown: _onTapDown,
        onTapUp: (details) => _onTapUp(),
        onTapCancel: () => _onTapUp(),
        onTap: widget.onTap,
        child: Transform.rotate(angle: _rotation, child: widget.child));
  }
}
