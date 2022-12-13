import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:opendietary/subcomponents/compressible.dart';
import 'package:opendietary/textstyles.dart';

class AnimatedMenuButton extends StatefulWidget {
  final void Function() onNewTag;
  final void Function() onNewCommunity;
  final void Function() onNewEvent;

  const AnimatedMenuButton(
      {required this.onNewTag, required this.onNewCommunity, required this.onNewEvent});

  @override
  State<AnimatedMenuButton> createState() => _AnimatedMenuButtonState();
}

class _AnimatedMenuButtonState extends State<AnimatedMenuButton>
    with SingleTickerProviderStateMixin {
  final double pi = 3.1415926535897932;
  final Duration duration = Duration(milliseconds: 200);
  double _rotation = 0;
  AnimationController? _controller;
  bool isOpen = false;

  @override
  void initState() {
    super.initState();
    _controller =
        AnimationController(vsync: this, duration: duration, lowerBound: 0.0, upperBound: pi / 4)
          ..addListener(() {
            setState(() {});
          });
  }

  void _toggleMenu() {
    if (isOpen) {
      _controller?.reverse();
    } else {
      _controller?.forward();
    }
    setState(() => isOpen = !isOpen);
  }

  void _tapNewTag() {
    _toggleMenu();
    widget.onNewTag();
  }

  void _tagNewCommunity() {
    _toggleMenu();
    widget.onNewCommunity();
  }

  void _tapNewEvent() {
    _toggleMenu();
    widget.onNewEvent();
  }

  @override
  Widget build(BuildContext context) {
    _rotation = _controller!.value;

    return Column(
      mainAxisAlignment: MainAxisAlignment.end,
      children: [
        AnimatedMenuOption(
            onTap: _tapNewTag,
            duration: duration,
            isOpen: isOpen,
            child: Icon(CupertinoIcons.tag, color: Colors.black, size: 24)),
        const SizedBox(height: 20),
        AnimatedMenuOption(
            onTap: _tagNewCommunity,
            duration: duration,
            isOpen: isOpen,
            child: Icon(CupertinoIcons.person_3, color: Colors.black, size: 24)),
        const SizedBox(height: 20),
        AnimatedMenuOption(
            onTap: _tapNewEvent,
            duration: duration,
            isOpen: isOpen,
            child: Icon(CupertinoIcons.calendar, color: Colors.black, size: 24)),
        const SizedBox(height: 20),
        Compressible(
            onTap: _toggleMenu,
            child: AnimatedContainer(
              duration: duration,
              curve: Curves.easeIn,
              margin: EdgeInsets.only(bottom: 3),
              decoration: BoxDecoration(
                color: isOpen ? Colors.white : PINK,
                shape: BoxShape.circle,
                boxShadow: [
                  BoxShadow(
                    color: Colors.grey.withOpacity(0.3),
                    spreadRadius: 2,
                    blurRadius: 3,
                    offset: Offset(0, 3), // changes position of shadow
                  ),
                ],
              ),
              child: Padding(
                  padding: const EdgeInsets.all(8.0),
                  child: Transform.rotate(
                      angle: _rotation,
                      child: Icon(CupertinoIcons.add,
                          color: isOpen ? Colors.black : Colors.white, size: 24))),
            )),
      ],
    );
  }
}

class AnimatedMenuOption extends StatelessWidget {
  final bool isOpen;
  final Duration duration;
  final Widget child;
  final void Function() onTap;

  const AnimatedMenuOption(
      {required this.onTap, required this.isOpen, required this.duration, required this.child});
  @override
  Widget build(BuildContext context) {
    return IgnorePointer(
      ignoring: !isOpen,
      child: AnimatedOpacity(
          opacity: isOpen ? 1 : 0,
          curve: Curves.easeIn,
          duration: duration,
          child: Compressible(
              onTap: onTap,
              child: Container(
                  decoration: BoxDecoration(
                    color: Colors.white,
                    shape: BoxShape.circle,
                    boxShadow: [
                      BoxShadow(
                        color: Colors.grey.withOpacity(0.3),
                        spreadRadius: 2,
                        blurRadius: 3,
                        offset: Offset(0, 3), // changes position of shadow
                      ),
                    ],
                  ),
                  child: Padding(padding: const EdgeInsets.all(8.0), child: child)))),
    );
  }
}
