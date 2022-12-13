import 'package:flutter/widgets.dart';

class ConditionalSafeArea extends StatelessWidget {
  const ConditionalSafeArea({
    required this.hasSafeArea,
    required this.child,
  });

  final Widget child;
  final bool hasSafeArea;

  @override
  Widget build(BuildContext context) {
    return hasSafeArea ? SafeArea(child: this.child) : this.child;
  }
}
