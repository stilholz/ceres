<?php

namespace Ceres\Containers;

use Plenty\Plugin\Templates\Twig;

class SingleItemContentContainer
{
    public function call(Twig $twig):string
    {
        return $twig->render('Ceres::Content');
    }
}