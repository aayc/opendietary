import 'dart:ui';

import 'package:flutter/material.dart';
import 'package:opendietary/subcomponents/smart_image_provider.dart';
import 'package:opendietary/textstyles.dart';

class SliverScaffold extends StatelessWidget {
  final Color headingBgColor;
  final Color bodyBgColor;
  final double expandedHeight;
  final double collapsedHeight;
  final String title;
  final String backgroundImage;
  final Widget body;
  final Function() onMore;
  final Function() onChat;

  const SliverScaffold(
      {super.key, this.headingBgColor = Colors.white,
      this.bodyBgColor = Colors.white,
      this.expandedHeight = 250,
      this.collapsedHeight = 60,
      required this.backgroundImage,
      required this.title,
      required this.onMore,
      required this.onChat,
      required this.body});

  double _getCollapsePadding(double t) {
    final double deltaExtent = expandedHeight - collapsedHeight;
    return -Tween<double>(begin: 0.0, end: deltaExtent / 4).transform(t);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        backgroundColor: bodyBgColor,
        body: NestedScrollView(
            physics: const BouncingScrollPhysics(),
            headerSliverBuilder: (context, _) => [
                  SliverAppBar(
                    pinned: true,
                    primary: true,
                    floating: false,
                    snap: false,
                    foregroundColor: headingBgColor,
                    backgroundColor: headingBgColor,
                    collapsedHeight: collapsedHeight,
                    toolbarHeight: 0.0,
                    expandedHeight: expandedHeight - 45,
                    elevation: 0.0,
                    actionsIconTheme: const IconThemeData(opacity: 0.0),
                    flexibleSpace: LayoutBuilder(
                      builder: (context, constraints) {
                        double currentExtent = constraints.maxHeight;
                        final double deltaExtent = expandedHeight - collapsedHeight;
                        // 0.0 -> Expanded
                        // 1.0 -> Collapsed to toolbar
                        final double t =
                            (1.0 - (currentExtent - collapsedHeight) / deltaExtent).clamp(0.0, 1.0);
                        final double collapsePadding = _getCollapsePadding(t);

                        return Stack(
                          fit: StackFit.loose,
                          children: [
                            Positioned(
                              top: collapsePadding,
                              left: 0.0,
                              right: 0.0,
                              height: expandedHeight,
                              child: Container(
                                  decoration: BoxDecoration(
                                      image: DecorationImage(
                                          colorFilter: ColorFilter.mode(
                                              Colors.black.withOpacity(1), BlendMode.dstATop),
                                          fit: BoxFit.cover,
                                          image: SmartImageProvider(backgroundImage))),
                                  child: Align(
                                      alignment: Alignment.bottomLeft,
                                      child: Padding(
                                          padding: EdgeInsets.only(
                                              bottom: -3 * collapsePadding + 10, left: 15),
                                          child: ClipRect(
                                              child: BackdropFilter(
                                                  filter:
                                                      ImageFilter.blur(sigmaX: 1.0, sigmaY: 1.0),
                                                  child: Row(
                                                    mainAxisAlignment:
                                                        MainAxisAlignment.spaceBetween,
                                                    children: [
                                                      Row(children: [
                                                        InkWell(
                                                            onTap: () => Navigator.pop(context),
                                                            child: const Icon(Icons.arrow_back_ios,
                                                                color: Colors.white)),
                                                        Text(title,
                                                            textAlign: TextAlign.center,
                                                            style: BOLD(WHITE(H3)).copyWith(
                                                              shadows: <Shadow>[
                                                                const Shadow(
                                                                  offset: Offset(0.1, 0.1),
                                                                  blurRadius: 3.0,
                                                                  color:
                                                                      Color.fromARGB(255, 0, 0, 0),
                                                                ),
                                                              ],
                                                            )),
                                                      ]),
                                                      Row(children: [
                                                        InkWell(
                                                          onTap: onChat,
                                                          child: Image.asset('assets/icon/chat.png',
                                                              width: 25,
                                                              height: 25,
                                                              color: Colors.white),
                                                        ),
                                                        const SizedBox(width: 10),
                                                        InkWell(
                                                            onTap: onMore,
                                                            child: const Icon(Icons.more_vert,
                                                                color: Colors.white))
                                                      ]),
                                                    ],
                                                  )))))),
                            ),
                          ],
                        );
                      },
                    ),
                  )
                ],
            body: Padding(
              padding: const EdgeInsets.symmetric(horizontal: 15),
              child: body,
            )));
  }
}
