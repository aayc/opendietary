import 'package:flutter/material.dart';

PageRouteBuilder SlideUpPageRoute({required Function builder}) {
  return PageRouteBuilder(
    pageBuilder: (c, a1, a2) => builder(),
    opaque: false,
    //barrierColor: Color.fromARGB(128, 0, 0, 0),
    transitionsBuilder: (c, anim, a2, child) {
      const begin = Offset(0.0, 1.0);
      const end = Offset.zero;
      final tween = Tween(begin: begin, end: end).chain(CurveTween(curve: Curves.ease));
      final offsetAnimation = anim.drive(tween);
      return SlideTransition(position: offsetAnimation, child: child);
    },
    transitionDuration: const Duration(milliseconds: 400),
  );
}
